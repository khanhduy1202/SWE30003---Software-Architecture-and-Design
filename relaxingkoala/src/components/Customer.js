import Reservation from "./Reservation";
import Order from "./Order";
import Feedback from "./Feedback";

class Customer {
	constructor(name, email, phoneNumber) {
		this.name = name;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.reservations = []; // Keep track of reservations
		this.orders = []; // Keep track of orders
		this.feedbacks = []; // Keep track of feedbacks
	}

	updateDetails(name, email, phoneNumber) {
		this.name = name;
		this.email = email;
		this.phoneNumber = phoneNumber;
	}

	placeOrder(orderNo, staff, table, menuItems) {
		if (typeof orderNo !== 'number' || !Array.isArray(menuItems)) {
			throw new Error("Invalid parameters for placeOrder");
		}
		const order = new Order(orderNo, this, staff, table);
		menuItems.forEach((item) => order.addOrderedItem(item));
		this.orders.push(order);
		return order;
	}

	makeReservation(reservationID, date, time, numOfPeople, table) {
		if (typeof reservationID !== 'number' || typeof date !== 'string' || typeof time !== 'string' || typeof numOfPeople !== 'number') {
			throw new Error("Invalid parameters for makeReservation");
		}
		const reservation = new Reservation(
			reservationID,
			this,
			date,
			time,
			numOfPeople,
			table
		);
		this.reservations.push(reservation);
		console.log("Reservation made:", reservation);
		return reservation;
	}

	cancelReservation(reservationID) {
		if (typeof reservationID !== 'number') {
			throw new Error("Invalid parameter for cancelReservation");
		}
		const index = this.reservations.findIndex(
			(res) => res.reservationID === reservationID
		);
		if (index !== -1) {
			const canceledReservation = this.reservations.splice(index, 1)[0];
			console.log("Reservation canceled:", canceledReservation);
			return canceledReservation;
		} else {
			throw new Error("Reservation not found");
		}
	}

	addFeedback() {
	}

	getFeedbacks() {
		return this.feedbacks;
	}
}

export default Customer;
