const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

/** GET /items/search - search items */
router.get('/search', itemsController.searchItems);

/** GET /items - get all items */
router.get('/', itemsController.getItems);

/** POST /items - create a new item */
router.post('/', itemsController.createItem);

/** GET /items/:name - get a single item */
router.get('/:name', itemsController.getItem);

/** PATCH /items/:name - update a single item */
router.patch('/:name', itemsController.updateItem);

/** DELETE /items/:name - delete a single item */
router.delete('/:name', itemsController.deleteItem);

module.exports = router;
