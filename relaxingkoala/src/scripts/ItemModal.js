import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { CartContext } from "../scripts/CartContext";
import "../styles/ItemModal.css";

Modal.setAppElement("#root");

function ItemModal({ isOpen, onRequestClose, item }) {
	const { addToCart } = useContext(CartContext);
	const [quantity, setQuantity] = useState(1);
	const [notes, setNotes] = useState("");
	const [isDecaf, setIsDecaf] = useState(false);
	const [milkChoice, setMilkChoice] = useState("");
	const [teaChoice, setTeaChoice] = useState("");
	const [icedTeaChoice, setIcedTeaChoice] = useState("");
	const [selectedIngredients, setSelectedIngredients] = useState([]);

	const handleQuantityChange = (amount) => {
		setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
	};

	const handleIngredientChange = (ingredient) => {
		setSelectedIngredients((prevIngredients) =>
			prevIngredients.includes(ingredient)
				? prevIngredients.filter((item) => item !== ingredient)
				: [...prevIngredients, ingredient]
		);
	};

	const handleAddToCart = () => {
		const itemWithDetails = {
			...item,
			quantity,
			notes,
			isDecaf,
			milkChoice,
			teaChoice,
			icedTeaChoice,
			customIngredients: item.customIngredients.filter(
				(ingredient) => !selectedIngredients.includes(ingredient)
			),
		};
		addToCart(itemWithDetails);
		onRequestClose();
	};

	const handleNotesChange = (e) => {
		const value = e.target.value;
		if (value.length <= 100) {
			setNotes(value);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="Item Modal"
			className="modal-content">
			<h2>{item.name}</h2>
			<div>{item.desc}</div>
			{item.needsDecaf && (
				<div>
					<label>
						<input
							type="checkbox"
							checked={isDecaf}
							onChange={(e) => setIsDecaf(e.target.checked)}
						/>
						Decaffeinated
					</label>
				</div>
			)}
			{item.needsMilk && (
				<div>
					<h3>Milk Choice:</h3>
					<select
						value={milkChoice}
						onChange={(e) => setMilkChoice(e.target.value)}>
						<option value="">Select Milk</option>
						<option value="Soy">Soy Milk</option>
						<option value="Almond">Almond Milk</option>
						<option value="Oat">Oat Milk</option>
						<option value="Lactose Free">Lactose Free Milk</option>
						<option value="Skim">Skim Milk</option>
						<option value="Full">Full Milk</option>
					</select>
				</div>
			)}
			{item.isTea && (
				<div>
					<h3>Tea Type:</h3>
					<select
						value={teaChoice}
						onChange={(e) => setTeaChoice(e.target.value)}>
						<option value="">Select Tea</option>
						<option value="English Breakfast">English Breakfast</option>
						<option value="Earl Grey">Earl Grey</option>
						<option value="Chamomile">Chamomile</option>
						<option value="Green">Green</option>
						<option value="Peppermint">Peppermint</option>
					</select>
				</div>
			)}
			{item.isIcedTea && (
				<div>
					<h3>Iced Tea Type:</h3>
					<select
						value={icedTeaChoice}
						onChange={(e) => setIcedTeaChoice(e.target.value)}>
						<option value="">Select Iced Tea</option>
						<option value="English Breakfast">English Breakfast</option>
						<option value="Hibiscus & Passion fruit Soda">
							Hibiscus & Passion fruit Soda
						</option>
						<option value="Earl Grey & Orange">Earl Grey & Orange</option>
						<option value="Green Tea Lemonade">Green Tea Lemonade</option>
					</select>
				</div>
			)}
			{item.customIngredients.length > 0 && (
				<div>
					<h3>Remove Ingredients:</h3>
					{item.customIngredients.map((ingredient, index) => (
						<div key={index} className="ingredient-checkbox">
							<input
								type="checkbox"
								checked={!selectedIngredients.includes(ingredient)}
								onChange={() => handleIngredientChange(ingredient)}
							/>
							<label>{ingredient}</label>
						</div>
					))}
				</div>
			)}
			<h3>Quantity:</h3>
			<div>
				<button
					onClick={() => handleQuantityChange(-1)}
					disabled={quantity <= 1}>
					-
				</button>
				<span>{quantity}</span>
				<button onClick={() => handleQuantityChange(1)}>+</button>
			</div>
			<h3>Notes:</h3>
			<textarea
				value={notes}
				onChange={handleNotesChange}
				placeholder="Add any special instructions"
			/>
			<div className="notes-counter">{notes.length}/100</div> {/* Character counter */}
			<button onClick={handleAddToCart}>Add to Cart</button>
		</Modal>
	);
}

export default ItemModal;
