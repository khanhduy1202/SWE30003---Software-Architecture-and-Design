import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	const serializeItem = (item) => {
		// Serialize item details to create a unique key for each customized item
		return JSON.stringify({
			name: item.name,
			isDecaf: item.isDecaf,
			milkChoice: item.milkChoice,
			teaChoice: item.teaChoice,
			icedTeaChoice: item.icedTeaChoice,
			customIngredients: item.customIngredients,
			notes: item.notes,
		});
	};

	const addToCart = (item) => {
		const itemKey = serializeItem(item);

		// Check if the item with the same customization already exists in the cart
		const existingItemIndex = cart.findIndex(
			(cartItem) => serializeItem(cartItem) === itemKey
		);

		if (existingItemIndex !== -1) {
			// If it exists, update the quantity
			const newCart = [...cart];
			newCart[existingItemIndex].quantity += item.quantity;
			setCart(newCart);
		} else {
			// If it doesn't exist, add the new item
			setCart([...cart, item]);
		}
	};

	const removeFromCart = (item) => {
		const itemKey = serializeItem(item);
		setCart(cart.filter((cartItem) => serializeItem(cartItem) !== itemKey));
	};

	const updateCartItemQuantity = (item, quantity) => {
		const itemKey = serializeItem(item);
		const existingItemIndex = cart.findIndex(
			(cartItem) => serializeItem(cartItem) === itemKey
		);

		if (existingItemIndex !== -1) {
			const newCart = [...cart];
			newCart[existingItemIndex].quantity += quantity;
			if (newCart[existingItemIndex].quantity <= 0) {
				newCart.splice(existingItemIndex, 1);
			}
			setCart(newCart);
		}
	};

	const clearCart = () => {
		setCart([]);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				clearCart,
				updateCartItemQuantity,
			}}>
			{children}
		</CartContext.Provider>
	);
};
