class Invoice {
	constructor(invoiceNo, order, dateTime) {
		if (typeof invoiceNo !== "number") {
			throw new Error("Invalid invoice number provided");
		}
		if (!order || !Array.isArray(order.orderedItems)) {
			throw new Error("Invalid order provided");
		}
		if (typeof dateTime !== "string") {
			throw new Error("Invalid date/time provided");
		}
		this.invoiceNo = invoiceNo;
		this.order = order;
		this.dateTime = dateTime;
	}

	getTotalPrice() {
		return this.order.orderedItems
			.reduce((total, item) => total + item.price * (item.quantity || 1), 0)
			.toFixed(2);
	}
}

export default Invoice;
