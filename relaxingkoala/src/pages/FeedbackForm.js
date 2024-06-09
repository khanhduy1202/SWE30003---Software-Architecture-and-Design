import React, { useState, useEffect, useContext } from "react";
import Feedback from "../components/Feedback";
import "../styles/Feedback.css";
import { AuthContext } from "../components/AuthContext"; // Import AuthContext

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
	const [feedbacks, setFeedbacks] = useState(() => {
		const savedFeedbacks = localStorage.getItem("feedbacks");
		return savedFeedbacks ? JSON.parse(savedFeedbacks) : initialFeedbacks;
	});
	const [name, setName] = useState("");
	const [content, setContent] = useState("");
	const [rating, setRating] = useState(0);
	const [anonymous, setAnonymous] = useState(false);
	const [nameError, setNameError] = useState("");
	const [ratingError, setRatingError] = useState("");

  const { user } = useContext(AuthContext); // Access the user from the context

	useEffect(() => {
		localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
	}, [feedbacks]);

	const validateForm = () => {
		let isValid = true;

		if (rating === 0) {
			setRatingError("Please provide a rating.");
			isValid = false;
		} else {
			setRatingError("");
		}

		return isValid;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validateForm()) {
			return;
		}

		const newFeedback = new Feedback(
			feedbacks.length + 1,
			name,
			content,
			rating,
			anonymous
		);
		setFeedbacks([...feedbacks, newFeedback.getFeedbackDetails()]);
		setContent("");
		setRating(0);
		setAnonymous(false);
	};

	const handleRemove = (feedbackID) => {
		const updatedFeedbacks = feedbacks.filter(
			(feedback) => feedback.feedbackID !== feedbackID
		);
		setFeedbacks(updatedFeedbacks);
	};

	return (
		<div className="feedback-container">
			<h1>Relaxing Koala</h1>
			<h2>Feedback Form</h2>

      {/* Conditionally render user greeting or input field */}
      {user ? ( 
        <h3 className="user-greeting text-2xl font-bold text-yellow-500 mb-4 mt-5"> Hi {user.name}! Please leave us a feedback!</h3> 
      ) : (
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              pattern="[A-Za-z\s-]+"
              title="Name should only contain letters, hyphens, and spaces."
              required={!anonymous}
              disabled={anonymous}
            />
          </label>
          {nameError && <div className="error-message">{nameError}</div>}
        </div>
      )}

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
							★
						</span>
					))}
				</div>
				{ratingError && <div className="error-message">{ratingError}</div>}
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
			<button type="submit" disabled={!name && !anonymous && rating === 0}>
				Submit
			</button>
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
									★
								</span>
							))}
						</div>
						<button onClick={() => handleRemove(fb.feedbackID)}>Remove</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FeedbackForm;