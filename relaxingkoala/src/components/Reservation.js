class Reservation {
	constructor(
		reservationID,
		customer,
		resDate,
		resTime,
		numOfPeople,
		tableNumber,
		restaurant
	) {
		this._validateNumber(reservationID, 'reservationID');
		this._validateCustomer(customer);
		this._validateString(resDate, 'resDate');
		this._validateString(resTime, 'resTime');
		this._validateNumber(numOfPeople, 'numOfPeople');
		this._validateString(tableNumber, 'tableNumber');
		this._validateRestaurant(restaurant);

		this.reservationID = reservationID;
		this.customer = customer;
		this.resDate = resDate;
		this.resTime = resTime;
		this.numOfPeople = numOfPeople;
		this.tableNumber = tableNumber;
		this.restaurant = restaurant;
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

	_validateCustomer(value) {
		if (!value || typeof value !== 'object' || !value.name) {
			throw new Error('Invalid customer object');
		}
	}

	_validateRestaurant(value) {
		if (!value || typeof value !== 'object' || !value.restaurantTables) {
			throw new Error('Invalid restaurant object');
		}
	}

	generateConfirmation() {
		return {
			reservationID: this.reservationID,
			customerName: this.customer.name,
			resDate: this.resDate,
			resTime: this.resTime,
			numOfPeople: this.numOfPeople,
			tableNumber: this.tableNumber,
		};
	}

	checkTableAvailability() {
		const table = this.restaurant.restaurantTables.find(
			(table) => table.tableNo === this.tableNumber
		);
		if (table && !table.status) { // Assuming status is false if the table is available
			table.updateStatus(true); // Mark the table as booked
			return true;
		}
		return false;
	}
}

export default Reservation;
