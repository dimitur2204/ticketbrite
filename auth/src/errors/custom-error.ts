export abstract class CustomError extends Error {
	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, CustomError.prototype);
	}

	abstract readonly statusCode: number;

	abstract serializeErrors(): {
		message: string;
		field?: string;
	}[];
}
