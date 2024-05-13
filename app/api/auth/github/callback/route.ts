import { createOrReturnGithubUser, github, retrieveGithubUser } from "@/lib/auth/github";
import { cookies } from "next/headers";
import defaultErrorHandler from "@/utils/defaultErrorHandler";
import { NextResponse } from "next/server";
import ApiError from "@/utils/ApiError";
import createLuciaSessionAndCookie from "@/lib/auth/createLuciaSessionAndCookie";

export const dynamic = "force-dynamic"

export const GET = defaultErrorHandler(async (req) => {
    const url = new URL(req.url);
    // Extract the code and state from the url
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    // Retrieving the stored state from the cookies
    const storedState = cookies().get('github_oauth_state')?.value ?? null;

    if (!code || !state || state !== storedState)
        throw new ApiError(400, "Oh No! Something went wrong. Please try again!");

    // Exchanging the code for a access token
    const tokens = await github.validateAuthorizationCode(code);
    const userFromGithub = await retrieveGithubUser(tokens.accessToken);
    const user = await createOrReturnGithubUser(userFromGithub);

    // Authenticate with lucia
    await createLuciaSessionAndCookie(user);

    // Redirect user.
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    return NextResponse.redirect(`${protocol}://${req.nextUrl.host}/`);
});

