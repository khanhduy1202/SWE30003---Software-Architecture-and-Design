import Invoice from "../components/Invoice";
import Order from "../components/Order";
import Customer from "../components/Customer";

export const reconstructInvoice = (savedInvoice) => {
	const parsedInvoice = JSON.parse(savedInvoice);

	// Reconstruct the customer
	const customer = new Customer(
		parsedInvoice.order.customer.name,
		parsedInvoice.order.customer.email,
		parsedInvoice.order.customer.phoneNumber
	);

	// Reconstruct the order
	const order = new Order(
		parsedInvoice.order.orderNo,
		customer,
		parsedInvoice.order.staff,
		parsedInvoice.order.table
	);
	order.orderedItems = parsedInvoice.order.orderedItems;
	order.totalPrice = parsedInvoice.order.totalPrice;
	order.orderStatus = parsedInvoice.order.orderStatus;

	// Reconstruct the invoice
	const invoice = new Invoice(parsedInvoice.invoiceNo, order, parsedInvoice.dateTime);
	return invoice;
};
