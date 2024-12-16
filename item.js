const items = require("./fakeDb");
const { ValidationError, NotFoundError } = require("./expressError");

class Item {
  constructor(name, price) {
    if (!name || typeof name !== "string" || !price || isNaN(price) || price <= 0) {
      throw new ValidationError("Invalid name or price");
    }
    this.name = name;
    this.price = price;

    // Keep track of all items
    items.push(this);
  }

  static findAll() {
    return items;
  }

  static find(name) {
    const foundItem = items.find(v => v.name === name);
    if (!foundItem) {
      throw new NotFoundError("No items found");
    }
    return foundItem;
  }

  static update(name, data) {
    const foundItem = Item.find(name);
    if (data.name) foundItem.name = data.name;
    if (data.price) foundItem.price = data.price;
    return foundItem;
  }

  static remove(name) {
    const foundIdx = items.findIndex(v => v.name === name);
    if (foundIdx === -1) {
      throw new NotFoundError(`Item '${name}' not found`);
    }
    items.splice(foundIdx, 1);
  }

  static search(query) {
    return items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  static clear() {
    items.length = 0; // Clear all items
  }
}

module.exports = Item;
