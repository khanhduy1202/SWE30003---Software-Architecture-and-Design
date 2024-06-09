class Table {
	constructor(tableNo, capacity) {
		this.tableNo = tableNo;
		this.capacity = capacity;
		this.status = false; // false means the table is available
	}

	// Method to update the status of the table
	updateStatus() {
	}

	// Method to check if the table is available
	isAvailable() {
		return !this.status;
	}

	// Method to check if the table is occupied
	isOccupied() {
		return this.status;
	}

	isUnavailable() {
		return this.status;
	}
}

export default Table;