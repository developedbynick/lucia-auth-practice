"use client";
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import { User } from 'lucia';

export const useUserQuery = () => {
    const res = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axios.get('/api/auth/user');
            return res.data.user as User
        }
    })
    return res;
}