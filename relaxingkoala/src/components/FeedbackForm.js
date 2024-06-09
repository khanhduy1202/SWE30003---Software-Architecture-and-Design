import React, { useState } from "react";
import Feedback from "./Feedback";
import "./styles/Feedback.css";

const initialFeedbacks = [
	{
		feedbackID: 1,
		customer: "John Doe",
		content: "Great service and wonderful ambiance!",
		rating: 5,
		anonymous: false,
	},
	{
		feedbackID: 2,
		customer: "Anonymous",
		content: "The food was delicious but the wait time was a bit long.",
		rating: 4,
		anonymous: true,
	},
];

const FeedbackForm = () => {
	const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
	const [name, setName] = useState("");
	const [content, setContent] = useState("");
	const [rating, setRating] = useState(0);
	const [anonymous, setAnonymous] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		const newFeedback = new Feedback(
			feedbacks.length + 1,
			anonymous ? "Anonymous" : name,
			content,
			rating,
			anonymous
		);
		setFeedbacks([...feedbacks, newFeedback]);
		setName("");
		setContent("");
		setRating(0);
		setAnonymous(false);
	};

	return (
		<div className="feedback-container">
			<h2>Feedback Form</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						Name:
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							pattern="[A-Za-z\s-]+"
							title="Name should only contain letters, hyphens, and spaces."
							required
							disabled={anonymous}
						/>
					</label>
				</div>
				<div>
					<label>
						Content:
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="rating">
					<div className="stars">
						{[1, 2, 3, 4, 5].map((star) => (
							<span
								key={star}
								className={star <= rating ? "star filled" : "star"}
								onClick={() => setRating(star)}>
								&#9733;
							</span>
						))}
					</div>
				</div>
				<div>
					<label>
						<input
							type="checkbox"
							checked={anonymous}
							onChange={(e) => setAnonymous(e.target.checked)}
						/>
						Anonymous
					</label>
				</div>
				<button type="submit">Submit</button>
			</form>
			<h2>Feedbacks</h2>
			<ul className="feedback-list">
				{feedbacks.map((fb) => (
					<li key={fb.feedbackID} className="feedback-item">
						<div>
							<strong>{fb.anonymous ? "Anonymous" : fb.customer}</strong>
						</div>
						<div>{fb.content}</div>
						<div>
							{[...Array(5)].map((star, index) => (
								<span
									key={index}
									className={index < fb.rating ? "star filled" : "star"}>
									&#9733;
								</span>
							))}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FeedbackForm;
