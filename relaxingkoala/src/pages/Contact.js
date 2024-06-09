import React from "react";
import "../styles/Contact.css"; // Assuming you have a Contact.css file for styles

function Contact() {
	return (
		<div className="contact-container">
			<h1>Relaxing Koala</h1>
			<h2>Contact Information</h2>
			<p className="contact-address">
				<strong>Address:</strong>
				<br />
				123 Koala Street <br />
				Hawthorn VIC 3122
			</p>
			<p className="contact-phone">
				<strong>Phone:</strong> +61 123 456 789
			</p>
			<p className="contact-email">
				<strong>Email:</strong>{" "}
				<a href="mailto:koalarelaxing@gmail.com">koalarelaxing@gmail.com</a>
			</p>
			<p className="contact-hours">
				<strong>Opening Hours:</strong>
			</p>
			<ul className="hours-list">
				<li><strong>Mon - Fri:</strong> 9:00 AM - 6:00 PM</li>
				<li><strong>Sat - Sun:</strong> 9:00 AM - 3:00 PM</li>
				
			</ul>
		</div>
	);
}

export default Contact;
