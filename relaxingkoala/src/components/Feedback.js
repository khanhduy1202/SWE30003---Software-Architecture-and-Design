class Feedback {
	constructor(feedbackID, customer, content, rating, anonymous = false) {
		this.feedbackID = feedbackID;
		this.customer = anonymous ? "Anonymous" : customer;
		this.content = content;
		this.rating = rating;
		this.postedDate = new Date().toLocaleString();
		this.updatedDate = this.postedDate;
	}

	updateFeedback(content, rating) {
		if (typeof content !== 'string' || typeof rating !== 'number' || rating < 0 || rating > 5) {
			throw new Error("Invalid content or rating");
		}
		this.content = content;
		this.rating = rating;
		this.updatedDate = new Date().toLocaleString(); // Update the date to the current date and time
	}

	getFeedbackDetails() {
		return {
			feedbackID: this.feedbackID,
			customer: this.customer,
			content: this.content,
			rating: this.rating,
			postedDate: this.postedDate,
			updatedDate: this.updatedDate,
		};
	}
}

export default Feedback;