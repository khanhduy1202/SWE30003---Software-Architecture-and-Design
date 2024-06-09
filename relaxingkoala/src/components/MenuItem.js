class MenuItem {
	constructor(
		name,
		desc,
		availability,
		categories,
		price,
		isCoffee = false,
		isTea = false,
		isIcedTea = false,
		needsMilk = false,
		needsDecaf = false,
		customIngredients = []
	) {
		this._validateString(name, 'name');
		this._validateString(desc, 'desc');
		this._validateBoolean(availability, 'availability');
		this._validateArray(categories, 'categories');
		this._validateNumber(price, 'price');
		this._validateBoolean(isCoffee, 'isCoffee');
		this._validateBoolean(isTea, 'isTea');
		this._validateBoolean(isIcedTea, 'isIcedTea');
		this._validateBoolean(needsMilk, 'needsMilk');
		this._validateBoolean(needsDecaf, 'needsDecaf');
		this._validateArray(customIngredients, 'customIngredients');

		this.name = name;
		this.desc = desc;
		this.availability = availability;
		this.categories = categories;
		this.price = price;
		this.isCoffee = isCoffee;
		this.isTea = isTea;
		this.isIcedTea = isIcedTea;
		this.needsMilk = needsMilk;
		this.needsDecaf = needsDecaf;
		this.customIngredients = customIngredients;
	}

	_validateString(value, fieldName) {
		if (typeof value !== 'string') {
			throw new Error(`Invalid type for ${fieldName}, expected string`);
		}
	}

	_validateBoolean(value, fieldName) {
		if (typeof value !== 'boolean') {
			throw new Error(`Invalid type for ${fieldName}, expected boolean`);
		}
	}

	_validateNumber(value, fieldName) {
		if (typeof value !== 'number') {
			throw new Error(`Invalid type for ${fieldName}, expected number`);
		}
	}

	_validateArray(value, fieldName) {
		if (!Array.isArray(value)) {
			throw new Error(`Invalid type for ${fieldName}, expected array`);
		}
	}
	updateItem(details) {
		const validKeys = [
			'name', 'desc', 'availability', 'categories', 'price', 
			'isCoffee', 'isTea', 'isIcedTea', 'needsMilk', 'needsDecaf', 'customIngredients'
		];
		for (let key in details) {
			if (validKeys.includes(key)) {
				this._validateField(key, details[key]);
				this[key] = details[key];
			} else {
				throw new Error(`Invalid property: ${key}`);
			}
		}
	}

	_validateField(key, value) {
		switch (key) {
			case 'name':
			case 'desc':
				this._validateString(value, key);
				break;
			case 'availability':
			case 'isCoffee':
			case 'isTea':
			case 'isIcedTea':
			case 'needsMilk':
			case 'needsDecaf':
				this._validateBoolean(value, key);
				break;
			case 'price':
				this._validateNumber(value, key);
				break;
			case 'categories':
			case 'customIngredients':
				this._validateArray(value, key);
				break;
			default:
				throw new Error(`Invalid property: ${key}`);
		}
	}
}

export default MenuItem;
