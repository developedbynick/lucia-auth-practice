import "server-only"

interface ApiError {
    status: string;
    statusCode: number;
    message: string
}

class ApiError extends Error implements ApiError {
    constructor(public statusCode: number, public message: string) {
        super(message);
        this.status = this.statusCode.toString().startsWith('4') ? 'Fail' : 'Internal Server Error';
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError