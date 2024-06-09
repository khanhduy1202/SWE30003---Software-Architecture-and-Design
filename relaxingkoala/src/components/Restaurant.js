import Table from "./Table";

class Restaurant {
	constructor() {
		this.restaurantTables = [];
	}

	// Adds new table to restaurant array of tables
	addTable(tableNo, capacity) {
		if (this.restaurantTables.some((table) => table.tableNo === tableNo)) {
			throw new Error(`Table number ${tableNo} already exists.`);
		}
		if (typeof tableNo !== "string" || typeof capacity !== "number") {
			throw new Error("Invalid table number or capacity");
		}
		const newTable = new Table(tableNo, capacity);
		this.restaurantTables.push(newTable);
	}

	// Populates the restaurant with initial tables
	populateRestaurant() {
		this.addTable("1", 2);
		this.addTable("2", 2);
		this.addTable("3", 4);
		this.addTable("4", 4);
		this.addTable("5", 4);
		this.addTable("6", 2);
		this.addTable("7", 2);
		this.addTable("8", 6);
		this.addTable("9", 6);
	}

	// Removes a table from the restaurant
	removeTable(tableNo) {
		this.restaurantTables = this.restaurantTables.filter(
			(table) => table.tableNo !== tableNo
		);
	}

	// Updates the capacity of a table
	updateTableCapacity(tableNo, newCapacity) {
		const table = this.restaurantTables.find(
			(table) => table.tableNo === tableNo
		);
		if (!table) {
			throw new Error(`Table number ${tableNo} does not exist.`);
		}
		if (typeof newCapacity !== "number") {
			throw new Error("Invalid capacity");
		}
		table.capacity = newCapacity;
	}

	// Gets a table's details
	getTableDetails(tableNo) {
		return (
			this.restaurantTables.find((table) => table.tableNo === tableNo) || null
		);
	}
}

export default Restaurant;