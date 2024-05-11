import "server-only";
import getUser from "@/lib/auth/getUser";
import { redirect } from 'next/navigation';
import { NextPage } from "next";
import React from "react";

const NotLoggedIn: NextPage<React.PropsWithChildren> = async ({ children }) => {
    const { user } = await getUser();
    if (user) {
        redirect('/');
    }
    return (
        <>{children}</>
    )
}

export default NotLoggedIn