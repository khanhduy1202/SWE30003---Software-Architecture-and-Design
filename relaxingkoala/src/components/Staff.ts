// Staff.ts
export interface Staff {
	staffID: number;
	firstName: string;
	fullName: string;
	department: string;
	role: string;
	ordersServed: any[]; // Replace with a more specific type if available
}
