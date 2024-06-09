class Payment {
	constructor(paymentID, order, amount, method, date, status) {
		this.paymentID = paymentID;
		this.order = order;
		this.amount = amount;
		this.method = method;
		this.date = date;
		this.status = status;
	}

	_validateNumber(value, fieldName) {
		if (typeof value !== 'number') {
			throw new Error(`Invalid type for ${fieldName}, expected number`);
		}
	}

	_validateString(value, fieldName) {
		if (typeof value !== 'string') {
			throw new Error(`Invalid type for ${fieldName}, expected string`);
		}
	}

	_validateOrder(value) {
		if (!value || typeof value !== 'object' || !value.orderNo) {
			throw new Error('Invalid order object');
		}
	}

	/**
	 * Processes the payment based on the method
	 */
	processPayment() {
		const validMethods = ["Credit Card", "Apple Pay", "Google Pay"];
		if (validMethods.includes(this.method)) {
			this.status = "Completed";
			this.date = new Date().toLocaleString(); // Update the date to the current date and time
		} else {
			this.status = "Failed";
		}
	}

	updatePaymentStatus(newStatus) {
		this._validateString(newStatus, 'newStatus');
		this.status = newStatus;
	}

	getPaymentDetails() {
		return {
			paymentID: this.paymentID,
			orderNo: this.order.orderNo, // Ensure the orderNo is the correct property
			amount: this.amount,
			method: this.method,
			date: this.date,
			status: this.status,
		};
	}
}

export default Payment;
