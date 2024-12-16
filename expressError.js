class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
    if (process.env.NODE_ENV !== "test") {
      console.error(this.stack);
    }
  }
}

class NotFoundError extends ExpressError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

class ValidationError extends ExpressError {
  constructor(message = 'Validation Error') {
    super(message, 400);
  }
}

module.exports = { ExpressError, NotFoundError, ValidationError };
