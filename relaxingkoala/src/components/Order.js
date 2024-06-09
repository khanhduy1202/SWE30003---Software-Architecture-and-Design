import Invoice from "./Invoice";

class Order {
	constructor(orderNo, customer, staff, table) {
		this.orderNo = orderNo;
		this.customer = customer;
		this.staff = staff;
		this.table = table;
		this.orderedItems = [];
		this.totalPrice = 0;
		this.orderStatus = "Pending"; // possible statuses: Pending, Preparing, Served, Completed
	}

	generateInvoice() {
		const dateTime = new Date().toLocaleString();
		const invoiceNo = Date.now(); // Using the current timestamp as a unique invoice number
		return new Invoice(invoiceNo, this, dateTime);
	}

	/**
	 * Calculates the total price of the order
	 */
	calcTotal() {
		this.totalPrice = this.orderedItems.reduce(
			(total, item) => total + item.price * (item.quantity || 1),
			0
		);
		this.totalPrice = Number(this.totalPrice.toFixed(2));
	}

	addOrderedItem(menuItem) {
		if (menuItem && typeof menuItem.price === "number" && menuItem.price > 0) {
			this.orderedItems.push(menuItem);
			this.calcTotal();
		} else {
			throw new Error("Invalid menu item");
		}
	}

	removeOrderedItem(menuItem) {
		const index = this.orderedItems.findIndex(
			(item) => item.name === menuItem.name
		);
		if (index !== -1) {
			this.orderedItems.splice(index, 1);
			this.calcTotal();
		} else {
			throw new Error("Item not found in the order");
		}
	}

	updateOrderStatus(newStatus) {
		const validStatuses = ["Pending", "Preparing", "Served", "Completed"];
		if (validStatuses.includes(newStatus)) {
			this.orderStatus = newStatus;
		} else {
			throw new Error("Invalid order status");
		}
	}

	getOrderDetails() {
		return {
			orderNo: this.orderNo,
			customer: this.customer,
			staff: this.staff,
			table: this.table,
			orderedItems: this.orderedItems,
			totalPrice: this.totalPrice,
			orderStatus: this.orderStatus,
		};
	}
}

export default Order;
