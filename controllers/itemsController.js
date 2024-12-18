const Item = require("../item");
const { NotFoundError, ValidationError } = require("../expressError");

/** GET /items - returns { items: [item, ...] } */
const getItems = (req, res, next) => {
  try {
    return res.json({ items: Item.findAll() });
  } catch (err) {
    return next(err);
  }
};

/** POST /items - create a new item; returns { item: item } */
const createItem = (req, res, next) => {
  try {
    const { name, price } = req.body;
    const newItem = new Item(name, price);
    return res.json({ item: newItem });
  } catch (err) {
    return next(err);
  }
};

/** GET /items/:name - return data about one item */
const getItem = (req, res, next) => {
  try {
    const foundItem = Item.find(req.params.name);
    return res.json({ item: foundItem });
  } catch (err) {
    return next(err);
  }
};

/** PATCH /items/:name - update an item; return { item: item } */
const updateItem = (req, res, next) => {
  try {
    const updatedItem = Item.update(req.params.name, req.body);
    return res.json({ item: updatedItem });
  } catch (err) {
    return next(err);
  }
};

/** DELETE /items/:name - delete an item, return { message: "Deleted" } */
const deleteItem = (req, res, next) => {
  try {
    Item.remove(req.params.name);
    return res.json({ message: "Deleted" });
  } catch (err) {
    return next(err);
  }
};

/** GET /items/search - search items by name */
const searchItems = (req, res, next) => {
  try {
    const query = req.query.name?.trim();
    console.log("Search Query:", query);

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const results = Item.search(query);
    console.log("Search Results:", results);

    return res.status(200).json({ items: results });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getItems,
  createItem,
  getItem,
  updateItem,
  deleteItem,
  searchItems,
};
