"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from "react";

export const queryClient = new QueryClient();

export default ({ children }: React.PropsWithChildren) => {
    return <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        {children}
    </QueryClientProvider>
}