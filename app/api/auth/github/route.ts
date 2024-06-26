import { github } from "@/lib/auth/github";
import defaultErrorHandler from "@/utils/defaultErrorHandler";
import { generateState } from "arctic";
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export const GET = defaultErrorHandler(async () => {
    const state = generateState();
    const url = await github.createAuthorizationURL(state, {
        scopes: ['read:user', "user:email"]
    });
    cookies().set("github_oauth_state", state, {
        httpOnly: true,
        maxAge: 30 * 1000,
        sameSite: 'lax'
    })
    return NextResponse.redirect(url);
})