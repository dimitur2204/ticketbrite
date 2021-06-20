import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
	public readonly reason = 'Error connecting to database';
	public readonly statusCode = 500;

	constructor() {
		super('Error connecting to db');
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}

	serializeErrors() {
		return [{ message: this.reason }];
	}
}
