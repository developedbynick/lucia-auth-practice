import getUser from "@/lib/auth/getUser";
import defaultErrorHandler from "@/utils/defaultErrorHandler";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = defaultErrorHandler(async () => {
    const { user } = await getUser();
    return NextResponse.json({ user });
})