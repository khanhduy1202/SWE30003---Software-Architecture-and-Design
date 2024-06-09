import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../scripts/CartContext";
import Invoice from "../components/Invoice";
import Payment from "../components/Payment";
import Receipt from "../components/Receipt";
import Customer from "../components/Customer";
import { reconstructInvoice } from "../scripts/Helpers";
import { AuthContext } from "../components/AuthContext"; // Import AuthContext
import "../styles/Cart.css";

function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
    addToCart,
    updateCartItemQuantity,
  } = useContext(CartContext);
  const [orderSent, setOrderSent] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [payment, setPayment] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [dineOption, setDineOption] = useState("dine-in");
  const [tableNumber, setTableNumber] = useState("");

  const { user } = useContext(AuthContext); // Access user from AuthContext

  // Load invoice from local storage if available
  useEffect(() => {
    const savedInvoice = localStorage.getItem("invoice");
    if (savedInvoice) {
      const reconstructedInvoice = reconstructInvoice(savedInvoice);
      setInvoice(reconstructedInvoice);
    }
  }, []);

  // Save invoice to local storage whenever it changes
  useEffect(() => {
    if (invoice) {
      const invoiceToSave = {
        invoiceNo: invoice.invoiceNo,
        dateTime: invoice.dateTime,
        order: {
          orderNo: invoice.order.orderNo,
          customer: {
            name: invoice.order.customer.name,
            email: invoice.order.customer.email,
            phoneNumber: invoice.order.customer.phoneNumber,
          },
          staff: invoice.order.staff,
          table: invoice.order.table,
          orderedItems: invoice.order.orderedItems,
          totalPrice: invoice.order.totalPrice,
          orderStatus: invoice.order.orderStatus,
        },
      };
      localStorage.setItem("invoice", JSON.stringify(invoiceToSave));
    } else {
      localStorage.removeItem("invoice");
    }
  }, [invoice]);

  const handleRemove = (item) => {
    removeFromCart(item);
  };

  const handleClear = () => {
    clearCart();
  };

  const handleSendToKitchen = () => {
    if (!user) {
      alert("Please log in to place an order.");
      return;
    }

    // Input validation for dine-in option and table number
    if (dineOption === "dine-in" && !tableNumber) {
      alert("Please select a table number for dine-in.");
      return;
    }

    alert("Order sent to the kitchen!");

    // Create customer object using logged-in user details
    const customer = new Customer(user.name, user.email, user.phoneNumber);

    const orderDetails = customer.placeOrder(
      Date.now(),
      "Staff1",
      tableNumber,
      cart
    );

    console.log("Sending order to the kitchen...", orderDetails);

    setTimeout(() => {
      alert("Order confirmed by Kitchen!");
      const invoiceDetails = new Invoice(
        Date.now(),
        orderDetails,
        new Date().toLocaleString()
      );
      setInvoice(invoiceDetails);
      clearCart();
      setOrderSent(false);
    }, 2000);

    setOrderSent(true);
  };

  const handlePayment = (method) => {
    const paymentID = Date.now();
    const amount = invoice.getTotalPrice();
    const newPayment = new Payment(
      paymentID,
      invoice.order,
      amount,
      method,
      new Date().toLocaleDateString(),
      "Pending"
    );
    newPayment.processPayment();
    setPayment(newPayment);
    alert(`Payment ${newPayment.status.toLowerCase()}!`);
    if (newPayment.status === "Completed") {
      setTimeout(() => {
        const receiptDetails = new Receipt(
          newPayment.order,
          new Date().toLocaleString()
        );
        setReceipt(receiptDetails);
        setPayment(null);
        setInvoice(null);
        clearCart();
        localStorage.removeItem("invoice"); 
      }, 2000);
    }
  };

  const handleSendReceipt = (method) => {
    if (method === "email") {
      alert(`Receipt sent to ${receipt.customer.email}`);
    } else if (method === "text") {
      alert(`Receipt sent to ${receipt.customer.phoneNumber}`);
    }
  };

  const handleQuantityChange = (item, amount) => {
    if (item.quantity + amount <= 0) {
      removeFromCart(item);
    } else {
      updateCartItemQuantity(item, amount);
    }
  };

  const handleCancelOrder = () => {
    alert("Order canceled.");
    setInvoice(null);
    setPayment(null);
    clearCart();
  };

  const totalPrice = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="cart-container">
      <h1>Relaxing Koala</h1>
      {!invoice && !payment && !receipt && cart.length === 0 ? (
        <div>
          <h2>Your Cart</h2>
          <p>Your cart is empty</p>
        </div>
      ) : (
        !invoice &&
        !payment &&
        !receipt && (
          <div>
            <h2>Your Cart</h2>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  <strong>{item.name}</strong>
                  {item.customIngredients && item.customIngredients.length > 0 && (
                    <div className="ingredient-list">
                      <strong>Ingredients:</strong>{" "}
                      {item.customIngredients.join(", ")}
                    </div>
                  )}
                  {item.notes && (
                    <div className="notes">
                      <strong>Notes:</strong> {item.notes}
                    </div>
                  )}
                  {item.needsDecaf && (
                    <div className="decaf">
                      <strong>Decaf:</strong> {item.isDecaf ? "Yes" : "No"}
                    </div>
                  )}
                  {item.needsMilk && (
                    <div className="milk">
                      <strong>Milk:</strong> {item.milkChoice || "None"}
                    </div>
                  )}
                  {item.isTea && (
                    <div className="tea">
                      <strong>Tea Type:</strong> {item.teaChoice || "None"}
                    </div>
                  )}
                  {item.isIcedTea && (
                    <div className="iced-tea">
                      <strong>Iced Tea Type:</strong>{" "}
                      {item.icedTeaChoice || "None"}
                    </div>
                  )}
                  <div className="quantity">
                    <button onClick={() => handleQuantityChange(item, -1)}>
                      -
                    </button>
                    {item.quantity}
                    <button onClick={() => handleQuantityChange(item, 1)}>
                      +
                    </button>
                  </div>
                  <div className="total-price">
                    <strong>Total Price:</strong> $
                    {(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button onClick={() => handleRemove(item)}>Remove</button>
                </li>
              ))}
            </ul>
            <div>
              <strong>Total Price: ${totalPrice}</strong>
            </div>
            <div>
              <h3>Customer Details</h3>
              {/* Display user details from AuthContext */}
              {user ? (
                <div>
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user.phoneNumber}
                  </p>
                </div>
              ) : (
                <p>Please log in to see your details.</p>
              )}

              <div className="form-group">
                <label>
                  Dine Option:
                  <select
                    value={dineOption}
                    onChange={(e) => setDineOption(e.target.value)}
                  >
                    <option value="dine-in">Dine In</option>
                    <option value="takeaway">Takeaway</option>
                  </select>
                </label>
              </div>
              {dineOption === "dine-in" && (
                <div className="form-group">
                  <label>
                    Table Number:
                    <select
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                    >
                      <option value="">Select Table</option>
                      {[...Array(50).keys()].map((table) => (
                        <option key={table + 1} value={table + 1}>
                          {table + 1}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}
              <button className="clear-button" onClick={handleClear}>
                Clear Cart
              </button>
              <button
                onClick={handleSendToKitchen}
                disabled={
                  !user ||
                  (dineOption === "dine-in" && !tableNumber) ||
                  orderSent
                }
              >
                {orderSent ? "Sending..." : "Send to Kitchen"}
              </button>
            </div>
          </div>
        )
      )}
      {invoice && !payment && !receipt && (
        <div>
          <h2>Invoice</h2>
          <p>
            <strong>Invoice No:</strong> {invoice.invoiceNo}
          </p>
          <p>
            <strong>Date/Time:</strong> {invoice.dateTime}
          </p>
          <ul>
            {invoice.order.orderedItems.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong>
                {item.customIngredients &&
                  item.customIngredients.length > 0 && (
                    <div className="ingredient-list">
                      <strong>Ingredients:</strong>{" "}
                      {item.customIngredients.join(", ")}
                    </div>
                  )}
                {item.notes && (
                  <div className="notes">
                    <strong>Notes:</strong> {item.notes}
                  </div>
                )}
                {item.needsDecaf && (
                  <div className="decaf">
                    <strong>Decaf:</strong> {item.isDecaf ? "Yes" : "No"}
                  </div>
                )}
                {item.needsMilk && (
                  <div className="milk">
                    <strong>Milk:</strong> {item.milkChoice || "None"}
                  </div>
                )}
                {item.isTea && (
                  <div className="tea">
                    <strong>Tea Type:</strong> {item.teaChoice || "None"}
                  </div>
                )}
                {item.isIcedTea && (
                  <div className="iced-tea">
                    <strong>Iced Tea Type:</strong>{" "}
                    {item.icedTeaChoice || "None"}
                  </div>
                )}
                <div className="quantity">
                  <strong>Quantity:</strong> {item.quantity}
                </div>
                <div className="total-price">
                  <strong>Price:</strong> $
                  {(item.price * item.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
          <div>
            <strong>Total Amount: ${invoice.getTotalPrice()}</strong>
          </div>
          <button onClick={() => handlePayment("Credit Card")}>
            Pay with Credit Card
          </button>
          <button onClick={() => handlePayment("Cash")}>Pay with Cash</button>
          <button onClick={() => handlePayment("Apple Pay")}>
            Pay with Apple Pay
          </button>
          <button onClick={() => handlePayment("Google Pay")}>
            Pay with Google Pay
          </button>
        </div>
      )}
      {payment && payment.status === "Completed" && !receipt && (
        <div>
          <h2>Payment Details</h2>
          <p>
            <strong>Payment ID:</strong> {payment.paymentID}
          </p>
          <p>
            <strong>Order No:</strong> {payment.order.orderNo}
          </p>
          <p>
            <strong>Amount:</strong> ${payment.amount}
          </p>
          <p>
            <strong>Payment Method:</strong> {payment.method}
          </p>
          <p>
            <strong>Date:</strong> {payment.date}
          </p>
          <p>
            <strong>Status:</strong> {payment.status}
          </p>
        </div>
      )}
      {payment && payment.status === "Failed" && (
        <div>
          <h2>Payment Details</h2>
          <p>
            <strong>Payment ID:</strong> {payment.paymentID}
          </p>
          <p>
            <strong>Order No:</strong> {payment.order.orderNo}
          </p>
          <p>
            <strong>Amount:</strong> ${payment.amount}
          </p>
          <p>
            <strong>Payment Method:</strong> {payment.method}
          </p>
          <p>
            <strong>Date:</strong> {payment.date}
          </p>
          <p>
            <strong>Status:</strong> {payment.status}
          </p>
          <div className="action-buttons">
            <button onClick={handleCancelOrder}>Cancel Order</button>
          </div>
          <button onClick={() => handlePayment("Credit Card")}>
            Retry with Credit Card
          </button>
          <button onClick={() => handlePayment("Cash")}>Retry with Cash</button>
          <button onClick={() => handlePayment("Apple Pay")}>
            Retry with Apple Pay
          </button>
          <button onClick={() => handlePayment("Google Pay")}>
            Retry with Google Pay
          </button>
        </div>
      )}
      {receipt && (
        <div>
          <h2>Receipt</h2>
          <p>
            <strong>Order No:</strong> {receipt.order.orderNo}
          </p>
          <p>
            <strong>Date/Time:</strong> {receipt.date}
          </p>
          <p>
            <strong>Customer:</strong> {receipt.customer.name}
          </p>
          <p>
            <strong>Email:</strong> {receipt.customer.email}
          </p>
          <p>
            <strong>Number:</strong> {receipt.customer.phoneNumber}
          </p>
          <ul>
            {receipt.items.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong>
                {item.customIngredients && item.customIngredients.length > 0 && (
                  <div className="ingredient-list">
                    <strong>Ingredients:</strong>{" "}
                    {item.customIngredients.join(", ")}
                  </div>
                )}
                {item.notes && (
                  <div className="notes">
                    <strong>Notes:</strong> {item.notes}
                  </div>
                )}
                {item.needsDecaf && (
                  <div className="decaf">
                    <strong>Decaf:</strong> {item.isDecaf ? "Yes" : "No"}
                  </div>
                )}
                {item.needsMilk && (
                  <div className="milk">
                    <strong>Milk:</strong> {item.milkChoice || "None"}
                  </div>
                )}
                {item.isTea && (
                  <div className="tea">
                    <strong>Tea Type:</strong> {item.teaChoice || "None"}
                  </div>
                )}
                {item.isIcedTea && (
                  <div className="iced-tea">
                    <strong>Iced Tea Type:</strong>{" "}
                    {item.icedTeaChoice || "None"}
                  </div>
                )}
                <div className="quantity">
                  <strong>Quantity:</strong> {item.quantity}
                </div>
                <div className="total-price">
                  <strong>Price:</strong> $
                  {(item.price * item.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
          <div>
            <strong>Total Amount: ${receipt.totalAmount}</strong>
          </div>
          {receipt.customer.email && (
            <button onClick={() => handleSendReceipt("email")}>
              Send via Email
            </button>
          )}
          {receipt.customer.phoneNumber && (
            <button onClick={() => handleSendReceipt("text")}>
              Send via Text
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;