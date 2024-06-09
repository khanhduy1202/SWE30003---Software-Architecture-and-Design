// BOHStaff.ts
import { Staff } from "./Staff";

class BOHStaff implements Staff {
	staffID: number;
	firstName: string;
	fullName: string;
	department: string;
	role: string;
	ordersServed: any[];

	constructor(
		staffID: number,
		firstName: string,
		fullName: string,
		department: string,
		role: string
	) {
		if (
			typeof staffID !== "number" ||
			typeof firstName !== "string" ||
			typeof fullName !== "string" ||
			typeof department !== "string" ||
			typeof role !== "string"
		) {
			throw new Error("Invalid parameters for BOHStaff constructor");
		}
		this.staffID = staffID;
		this.firstName = firstName;
		this.fullName = fullName;
		this.department = department;
		this.role = role;
		this.ordersServed = [];
	}

	updateOrderStatus() {}
}

export default BOHStaff;
