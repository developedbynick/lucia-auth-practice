import { lucia } from '@/auth'
import TUser from '@/types/models/User';
import { HydratedDocument } from 'mongoose';
import { cookies } from 'next/headers';

export type UserWithoutTimestamps = Omit<TUser, 'createdAt' | 'updatedAt'>

export default async function createLuciaSessionAndCookie(user: HydratedDocument<UserWithoutTimestamps>) {
    // Create session and cookie
    const session = await lucia.createSession(user._id, {});
    // Set cookie
    const cookie = lucia.createSessionCookie(session.id);
    cookies().set(cookie.name, cookie.value, cookie.attributes);
}