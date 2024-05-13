import ApiError from '@/utils/ApiError';
import { NextRequest, NextResponse } from 'next/server';

type ErrorFunctionReturnType<T extends ApiError | Error | unknown> = (e: T) => NextResponse;

// Function that receives the callback function
const defaultErrorHandler = function <T extends (r: NextRequest, r2: { params: object }) => Promise<NextResponse> | NextResponse>(f: T) {
    return async function () {
        // @ts-ignore
        const functionAsPromise = Promise.resolve(f(...arguments));
        try {
            return await functionAsPromise;
        } catch (e) {
            // @ts-ignore
            console.log(e.message)
            // Handling custom errors that were thrown
            if (e instanceof ApiError) return handleApiErrors(e);
            // Handling Internal Server Errors
            return handleUnknownServerErrors(e);
        }
    }
};

const handleApiErrors: ErrorFunctionReturnType<ApiError> = (e) => {
    return NextResponse.json({
        status: e.status,
        message: e.message,
    }, { status: e.statusCode })
}
const handleUnknownServerErrors: ErrorFunctionReturnType<unknown> = (e) => {
    // We'd notify developers here... or have something like sentry take over.
    return NextResponse.json({
        status: 'Internal Server Error',
        message: "Oh No! There was an unknown error. Developers have been notified."
    })
}

export default defaultErrorHandler