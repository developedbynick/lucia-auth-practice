import ApiError from '@/utils/ApiError';
import { NextRequest, NextResponse } from 'next/server';
// Function that receives the callback function


const defaultErrorHandler = function <T extends (r: NextRequest, r2: { params: object }) => Promise<NextResponse> | NextResponse>(f: T) {
    return async function () {
        // @ts-ignore
        const functionAsPromise = Promise.resolve(f(...arguments)); // This and other lines will require the ts target to be ES2015 or above.
        try {
            return await functionAsPromise;
        } catch (e) {
            console.log(e);
            let response: NextResponse;
            if (e instanceof ApiError) {
                response = NextResponse.json({
                    status: e.status,
                    message: e.message,
                }, { status: e.statusCode })
            } else {
                // @ts-ignore
                // if(e instanceof Error && e.message.includes('NEXT_REDIRECT')) {
                //     return NextResponse.
                // }
                response = NextResponse.json({
                    status: "Failure",
                    message: `An unexpected error occurred, and developers have been notified. Please try again later`,
                }, { status: 500 });
            }
            return response;
        }
    }
}
export default defaultErrorHandler