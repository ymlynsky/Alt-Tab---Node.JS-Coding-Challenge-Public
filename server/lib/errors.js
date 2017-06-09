const HTTPStatus = require('http-status');
const {ErrorModel, CustomError} = require('./error-model');

module.exports.loginError = function loginError(message, originalMessage) {
    return new ErrorModel(HTTPStatus.UNAUTHORIZED, 'error.msg.login.invalid.credentials', message, originalMessage);
};

module.exports.userPasswordError = function userPasswordError(message) {
  return new CustomError(
    HTTPStatus.INTERNAL_SERVER_ERROR,
    'error.msg.user.password.failure',
    message
  );
};

module.exports.unauthorized = function unauthorized(message, originalMessage) {
    return new ErrorModel(HTTPStatus.FORBIDDEN, 'error.msg.unauthorized.to.access.resource', message, originalMessage);
};

module.exports.updateResourceError = function updateResourceError(message, originalMessage) {
    return new ErrorModel(HTTPStatus.INTERNAL_SERVER_ERROR, 'error.msg.error.updating.resource', message, originalMessage);
};