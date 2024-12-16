const express = require('express');
const app = express();

app.use(express.json());

// Import routes
const itemsRoutes = require('./routes/items');

// Use routes
app.use('/items', itemsRoutes);

// 404 handler - for routes not found
app.use(function (req, res, next) {
  res.status(404).json({ error: "Not Found" });
});

// General error handler
app.use(function (err, req, res, next) {
  // Set the status code to err.status if set, else default to 500
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
