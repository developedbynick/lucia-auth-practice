'use client'
import { usePathname } from 'next/navigation';
import React from 'react'

interface ButtonProps {
    isProcessing: boolean;
}
const DynamicFormSubmitButton = ({ isProcessing }: ButtonProps) => {
    const pathname = usePathname();
    const isLogin = pathname.startsWith('/log');
    return (
        <button disabled={isProcessing} className='w-full mt-3 bg-[#222] p-2 rounded-md text-white font-medium text-base disabled:cursor-wait disabled:opacity-90 transition-all duration-500'>
            {isProcessing ? 'Processing...' : `Sign ${isLogin ? 'in' : 'up'}`}
        </button>
    )
}

export default DynamicFormSubmitButton