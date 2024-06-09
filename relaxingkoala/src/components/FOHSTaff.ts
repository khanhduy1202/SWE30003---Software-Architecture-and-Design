// Manager.ts
import { Staff } from "./Staff";

class Manager implements Staff {
  staffID: number;
  firstName: string;
  fullName: string;
  department: string;
  role: string;
  ordersServed: any[];
  recurringOrderList: any[];
  posSystemAccess: boolean;
  databaseAccess: boolean;
  adminSystemAccess: boolean;

  constructor(
    staffID: number,
    firstName: string,
    fullName: string,
    department: string,
    role: string,
    posSystemAccess: boolean,
    databaseAccess: boolean,
    adminSystemAccess: boolean
  ) {
    if (
      typeof staffID !== "number" ||
      typeof firstName !== "string" ||
      typeof fullName !== "string" ||
      typeof department !== "string" ||
      typeof role !== "string" ||
      typeof posSystemAccess !== "boolean" ||
      typeof databaseAccess !== "boolean" ||
      typeof adminSystemAccess !== "boolean"
    ) {
      throw new Error("Invalid parameters for Manager constructor");
    }
    this.staffID = staffID;
    this.firstName = firstName;
    this.fullName = fullName;
    this.department = department;
    this.role = role;
    this.ordersServed = [];
    this.recurringOrderList = [];
    this.posSystemAccess = posSystemAccess;
    this.databaseAccess = databaseAccess;
    this.adminSystemAccess = adminSystemAccess;
  }

  addRecurringOrder(){
  }

  hasPOSAccess() {
  }

  hasDatabaseAccess() {
    return this.databaseAccess;
  }

  hasAdminSystemAccess(){
  }
}

export default Manager;
