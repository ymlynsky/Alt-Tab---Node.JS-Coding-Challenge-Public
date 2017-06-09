function ErrorModel(status, code, message, originalMessage, errors) {
  Error.captureStackTrace(this, ErrorModel);

  this.code = code;

  this.message = process.env.NODE_ENV === 'production'
    ? message
    : (originalMessage || message || 'Unknown error');

  this.originalMessage = originalMessage;

  if (this.message && this.message.length > 2000) {
    this.message = `${this.message.slice(0, 2000)}...${this.message.slice(this.message.length - 100)}`;
  }

  this.status = status;
  this.errors = errors || [];
}

ErrorModel.prototype = Object.create(Error.prototype);

// new error model that keeps original stack trace
// will eventually replace ErrorModel
function CustomError(status, code, message, originalError, errors) {
  if (originalError instanceof Error) {
    this.stack = originalError.stack;
    this.originalMessage = originalError.message;
  } else {
    Error.captureStackTrace(this, CustomError);
  }

  this.code = code;
  this.message = message;
  this.status = status;
  this.errors = errors || [];
}

CustomError.prototype = Object.create(Error.prototype);

module.exports = {
  ErrorModel,
  CustomError
};