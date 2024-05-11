"use client";
import { useUserQuery } from '@/queries/users';
import { User } from 'lucia';
import { User as TUser } from 'lucia';
import { ReactNode, createContext, useEffect, useState } from 'react';


const fetchData = async () => {
    const res = await fetch('/api/auth/user', { cache: 'no-store' });
    return (await res.json())?.user as User | null;
}
type ReactStateAndContextForUser = TUser | null;
type ReactStatusState = 'loading' | 'loaded';
interface SessionContextType {
    user: TUser | null | undefined;
    status: ReactStatusState
}
export const SessionContext = createContext<SessionContextType | null>(null);

// value: User | null
export default ({ children }: { children: ReactNode }) => {
    const { data, isLoading } = useUserQuery();
    return <SessionContext.Provider value={{ status: isLoading ? 'loading' : 'loaded', user: data }}>
        {children}
    </SessionContext.Provider>

}