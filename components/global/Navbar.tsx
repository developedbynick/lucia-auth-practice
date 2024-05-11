"use client"
import Link from "next/link";
import { User as TUser } from "lucia";
import capitalize from "capitalize";
import { User } from "lucide-react";
import useUser from "@/hooks/useUser";
import { handleLogout as logout } from "@/actions/user/actions.user";
import { queryClient } from "./QueryClientProvider";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { user, status } = useUser();
    const loadingClass = `animate-pulse bg-gray-400 rounded max-w-20 w-full`;
    return (
        <header className="bg-white flex justify-between items-center  min-h-[8vh] h-[10vh] py-2.5 px-6">
            <Link href="/" className="text-base cursor-pointer font-bold inline-block">Lucia Auth Test</Link>
            {/* Dynamic Navigation Bar */}
            <nav className={` space-x-3 flex p-3 justify-end ${status === 'loading' ? loadingClass : ''}`}>
                {status === 'loaded' ? user ? <Authenticated user={user} /> : <NotAuthenticated /> : ""}
            </nav>
        </header>
    )
}
const NotAuthenticated = () => {
    return <>
        <Link href="/sign-up">Sign Up</Link>
        <Link href="/login">Login</Link>
    </>
}

const Authenticated = ({ user }: { user: TUser }) => {
    const router = useRouter();
    const handleLogout = async () => {
        const err = await logout();
        if (err) {
            return alert(err.message);
        }
        await queryClient.invalidateQueries({ queryKey: ['user'] });
        router.push('/');
    }
    return <>
        <div className="bg-gray-300 p-2 rounded-full cursor-pointer" title={capitalize.words(user.name)}>
            <User size={25} />
        </div>
        <button onClick={handleLogout}>Logout</button>
    </>
}



export default Navbar