export class NotFoundError extends Error {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class InputParseError extends Error {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
