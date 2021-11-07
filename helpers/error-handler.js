class ServiceError extends Error {
    constructor(message, status) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.message = message || 'Internal Server Error.';

        this.status = status || 500;
    }
}

class ApplicationError extends ServiceError {
    constructor(message, status) {
        super(`Internal Server Error${message?': ' + message : '.'}`, status || 500);

    }
}


class ValidationError extends ServiceError {
    constructor(message, status) {
        super(`Validation Error${message?': ' + message : '.'}`, status || 97);
    }
}


class DatabaseError extends ServiceError {
    constructor(message, status) {
        super(message || 'Database Error.', status || 98);
        super(`Database Error${message?': ' + message : '.'}`, status || 98);
    }
}


class AuthorizationError extends ServiceError {
    constructor(message, status) {
        super(`Unauthorized${message?': ' + message : '.'}`, status || 99);
    }
}


module.exports = {
    ApplicationError,
    AuthorizationError,
    ValidationError,
    DatabaseError
};