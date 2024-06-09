import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import bannerImage from "../resources/icons/background.webp"; // Adjust the path as needed

function Home() {
	return (
		<div className="home-container" role="main">
			<div className="banner" style={{ backgroundImage: `url(${bannerImage})` }}>
				<div className="overlay">
					{/* <h1>Fresh and delicious</h1> */}
					<h2>Relaxing Koala</h2>
					<p>
						Welcome to Relaxing Koala Cafe. The food here is fresh and delicious, 
						and the price is favorable. You are welcome to taste it.
					</p>
					<br />
					<br />
					<Link to="/menu" className="home-button" aria-label="Learn More">
						Look at our Menu
					</Link>
					<Link to="/reservation" className="home-button" aria-label="Learn More">
						Book a Table Now
					</Link>
					<Link to="/feedback" className="home-button" aria-label="Learn More">
						What others are saying about us
					</Link>
					<Link to="/contact" className="home-button" aria-label="Learn More">
						Contact Us
					</Link>
					<p></p>
				</div>
			</div>
			<div className="content">
				<p>
					Welcome to Relaxing Koala Cafe, your favorite neighborhood spot for
					delightful meals and a relaxing ambiance. Nestled in the heart of
					Hawthorn, our cafe offers a cozy retreat from the hustle and bustle of
					city life. Whether you're in the mood for a hearty breakfast, a
					leisurely lunch, or a cup of our expertly brewed coffee, Relaxing Koala
					has something to satisfy every craving.
				</p>
				<p>
					Our menu features a wide array of delicious options, from traditional
					favorites to unique, house-made specialties. Enjoy our famous Big
					Breakfast, savor the flavors of our gourmet burgers, or indulge in our
					freshly baked pastries and desserts. We also offer a variety of vegan,
					vegetarian, and gluten-free options to cater to all dietary preferences.
				</p>
				<p>
					At Relaxing Koala, we pride ourselves on providing exceptional service
					in a warm and inviting atmosphere. Our friendly staff is dedicated to
					making your visit enjoyable, whether you're here for a quick bite, a
					family meal, or a catch-up with friends.
				</p>
				<p>
					Join us at Relaxing Koala Cafe and experience the perfect blend of great
					food, great coffee, and great company. We look forward to serving you
					soon!
				</p>
			</div>
		</div>
	);
}

export default Home;
