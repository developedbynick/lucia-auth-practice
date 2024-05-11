import "@/utils/connectToDb";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { cache } from "react";

let emptySession = { session: null, user: null };

export default cache(async () => {
    // Extract the session from the cookie
    const sessionID = cookies().get(lucia.sessionCookieName)?.value ?? '';
    if (!sessionID) return emptySession;
    // Validate the session with lucia
    const session = await lucia.validateSession(sessionID);
    if (!session.session || !session.user) return emptySession;

    // Return the user with lucia
    return { user: session.user, session: session.session };
})