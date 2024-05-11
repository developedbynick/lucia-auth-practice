import { github, retrieveGithubUser } from "@/lib/auth/github";
import { cookies } from "next/headers";
import defaultErrorHandler from "@/utils/defaultErrorHandler";
import { NextResponse } from "next/server";
import ApiError from "@/utils/ApiError";

export const dynamic = "force-dynamic"

export const GET = defaultErrorHandler(async (req) => {
    const url = new URL(req.url);
    // Extract the code and state from the url
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    // Retrieving the stored state from the cookies
    const storedState = cookies().get('github_oauth_state')?.value ?? null;
    if (!code || !state || state !== storedState) {
        throw new ApiError(400, "Invalid code or state. It's also possible that the state doesn't match the stored state.");
    }
    // Exchanging the code for a access token
    const tokens = await github.validateAuthorizationCode(code);
    const user = await retrieveGithubUser(tokens.accessToken);

    return NextResponse.json({ user });

});

