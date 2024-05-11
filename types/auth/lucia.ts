import { lucia } from '@/auth'
import TUser from '../models/User';

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: TUser;
    }
}