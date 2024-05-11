"use client";
import Image from 'next/image'
import Logo from '@/public/DD-Logo.jpeg'
import Socials from '@/components/Auth/Socials'
import { usePathname } from 'next/navigation';

const DynamicAuthHeader = () => {
    const pathname = usePathname();
    const isLogin = pathname.startsWith('/login');
    return (
        <header className='flex items-center justify-center py-4 flex-col space-y-0.5'>
            <Image src={Logo} alt='Degree Dollars Logo' className='rounded-full mb-2' width={80} height={80} draggable={false} />
            <h1 className='text-2xl font-medium'>{isLogin ? 'Welcome Back' : 'Get Started'}</h1>
            <p>{`Please enter your details to sign ${isLogin ? 'in' : 'up'}.`}</p>
            <Socials />
        </header>
    )
}

export default DynamicAuthHeader