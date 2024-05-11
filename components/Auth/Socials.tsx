import React from 'react'
import { IconType } from 'react-icons';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { BsTwitterX } from 'react-icons/bs';
import { NextPage } from 'next';
import Link from 'next/link';

type SocialData = {
    name: string;
    Icon: IconType,
    href: string;
}[]

const socialData: SocialData = [
    { name: "Google", Icon: FaGoogle, href: "/api/auth/google" },
    { name: "Twitter(X)", Icon: BsTwitterX, href: "/api/auth/twitter" },
    { name: "Github", Icon: FaGithub, href: "/api/auth/github" },
]

interface SocialProps {
    withOrSeparator?: boolean;
}

const Socials: NextPage<SocialProps> = ({ withOrSeparator = true }) => {
    return (
        <>
            <div id='socials' className='w-full flex items-center justify-center space-x-3 py-3'>
                {socialData.map(social => {
                    return <a href={social.href} key={social.name.toLowerCase()}>
                        <div className='border-2 rounded-md py-1.5 px-8'>
                            <social.Icon size={18} className='cursor-pointer' title={social.name} />
                        </div>
                    </a>
                })}
            </div>
            {withOrSeparator && <div className='w-[80%] mx-auto flex items-center space-x-3'>
                <div className='h-1 w-full border-b-2' />
                <h1 className='text-sm font-semibold'>OR</h1>
                <div className='h-1 w-full border-b-2' />
            </div>}
        </>
    )
}

export default Socials