"use server";
import crypto from 'crypto';
import { HydratedDocument } from "mongoose";
import User from '@/models/UserModel';
import { lucia } from '@/auth';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import capitalize from 'capitalize';
import { revalidatePath } from 'next/cache';
import ActionError from '@/utils/ActionError';
import createLuciaSessionAndCookie from '@/lib/auth/createLuciaSessionAndCookie';
import returnUserWithoutPassword, { UserWithoutPasswordReturnType } from '@/lib/auth/returnUserWithoutPassword';
// Types 
export interface SignUpProps {
    name: string;
    email: string;
    password: string
}

export interface SignInProps {
    email: string;
    password: string;
}

type UserAuthReturnType = { success: boolean, message: string; user: UserWithoutPasswordReturnType | null }
type UserAuthFn<T extends object> = (data: T) => Promise<UserAuthReturnType>;

// Helpers

// Actions
export const signUpAction: UserAuthFn<SignUpProps> = async ({ name, email, password }) => {
    // Validate incoming input
    if (!name || !email || !password)
        return { success: false, message: "Please provide the required fields.", user: null }
    // Create User
    const user = await User.create({ email, password: await bcrypt.hash(password, 12), name, _id: crypto.randomUUID() })
    await createLuciaSessionAndCookie(user);
    return { success: true, user: returnUserWithoutPassword(user), message: "Successfully created user" };
}

export const signInAction: UserAuthFn<SignInProps> = async ({ email, password }) => {
    // Find user with email with added password
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    // Validate user and password
    if (!user || !(await user.comparePasswords(user.password, password)))
        return { success: false, message: "Incorrect email or password", user: null };
    // Create and set session cookie
    await createLuciaSessionAndCookie(user);
    // Return user
    return { success: true, message: `Welcome Back ${capitalize(user.name.split(' ')[0])}`, user: returnUserWithoutPassword(user) }
}

export const handleLogout = async () => {
    "use server"
    const reqCookies = cookies();
    // Extract session cookie value from request
    const sessionID = reqCookies.get(lucia.sessionCookieName)?.value ?? '';
    // If the cookie isn't present, we return a custom error.
    if (!sessionID) return new ActionError("You are not authenticated!");
    // If the cookie is present, then invalidate it
    await lucia.invalidateSession(sessionID);
    // Create and set blank session cookie
    const blankCookie = lucia.createBlankSessionCookie();
    reqCookies.set(blankCookie.name, blankCookie.value, blankCookie.attributes);
    // Revalidate Path and redirect
    revalidatePath('/');
}