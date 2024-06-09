class Receipt {
	constructor(order, date) {
		this._validateOrder(order);
		this._validateString(date, 'date');

		this.order = order;
		this.date = date;
		this.items = order.orderedItems || []; // Ensure this is correctly assigned
		this.totalAmount = this.calculateTotalAmount();
		this.customer = order.customer;
	}

	_validateOrder(value) {
		if (!value || typeof value !== 'object' || !value.orderedItems) {
			throw new Error('Invalid order object');
		}
	}

	_validateString(value, fieldName) {
		if (typeof value !== 'string') {
			throw new Error(`Invalid type for ${fieldName}, expected string`);
		}
	}

	calculateTotalAmount() {
		return this.items
			.reduce((total, item) => total + item.price * (item.quantity || 1), 0)
			.toFixed(2);
	}

	generateReceipt() {
		return {
			orderNo: this.order.orderNo,
			date: this.date,
			customerName: this.customer.name,
			items: this.items.map((item) => ({
				name: item.name,
				price: item.price,
				quantity: item.quantity || 1,
			})),
			totalAmount: this.totalAmount,
		};
	}
}

export default Receipt;
