import { HydratedDocument } from "mongoose";
import { UserWithoutTimestamps } from "./createLuciaSessionAndCookie";
import TUser from '../../types/models/User'
export type UserWithoutAllThree = Omit<UserWithoutTimestamps, 'password'>
export type HydratedUserWithoutAllThree = HydratedDocument<UserWithoutAllThree>
export type UserWithoutPasswordReturnType = Omit<TUser, '_id' | 'password'>
export default function returnUserWithoutPassword(user: HydratedUserWithoutAllThree): UserWithoutPasswordReturnType {
    const userWithoutPassword = JSON.parse(JSON.stringify(user));
    userWithoutPassword.password = null;
    return userWithoutPassword
}