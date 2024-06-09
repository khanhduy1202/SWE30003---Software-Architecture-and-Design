import MenuItem from "./MenuItem";
import menuData from "../data/menu.json"; // Import menu data from JSON

class Menu {
	constructor() {
		this.categories = {};
	}

	addItem(category, menuItem) {
		if (!(menuItem instanceof MenuItem)) {
			throw new Error("Invalid menu item");
		}
		if (!this.categories[category]) {
			this.categories[category] = [];
		}
		this.categories[category].push(menuItem);
	}

	removeItem(category, menuItem) {
		if (!this.categories[category]) {
			return;
		}
		const index = this.categories[category].findIndex(
			(item) => item.name === menuItem.name
		);
		if (index !== -1) {
			this.categories[category].splice(index, 1);
		}
	}

	/**
	 * Populates the menu from the menu.json file
	 */
	populateMenu() {
		for (const category of Object.keys(menuData)) {
			menuData[category].forEach((itemData) => {
				const menuItem = new MenuItem(
					itemData.name,
					itemData.description,
					itemData.available,
					itemData.category,
					itemData.price,
					itemData.isCoffee,
					itemData.isTea,
					itemData.isIcedTea,
					itemData.needsMilk,
					itemData.needsDecaf,
					itemData.ingredients
				);

				// Add the new MenuItem to the Menu object
				this.addItem(category, menuItem);
			});
		}
	}	
}

export default Menu;