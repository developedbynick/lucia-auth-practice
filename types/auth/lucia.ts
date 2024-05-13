import { lucia } from '@/auth'
import { UserWithoutPasswordReturnType } from '@/lib/auth/returnUserWithoutPassword';

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: UserWithoutPasswordReturnType
    }
}