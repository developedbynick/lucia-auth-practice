'use client';
import AuthFormWrapper from '@/components/Auth/AuthFormWrapper';
import DynamicAuthHeader from '@/components/Auth/DynamicAuthHeader';
import DynamicFormSubmitButton from '@/components/Auth/DynamicFormSubmitButton';
import { SignUpProps, signUpAction } from '@/actions/user/actions.user';
import React, { useState } from 'react';
import Link from 'next/link';
import InputLabelGroup from '@/components/Auth/InputLabelGroup';

const SignUp = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const handleFormSubmission = async (e: React.FormEvent) => {
        // Prevent default
        e.preventDefault();

        // Setting the state back to it's original value. If we're here, then that means an error occurred.
        setIsProcessing(false);
    }

    return <main className='flex flex-col justify-center items-center flex-1'>
        <AuthFormWrapper>
            <form className='auth-form' onSubmit={handleFormSubmission}>
                <DynamicAuthHeader />
                <InputLabelGroup label='name' inputPlaceholder='Please enter your name' labelTextContent='Name' inputType='text' />
                <InputLabelGroup label='email' inputPlaceholder='Please enter your email' labelTextContent='Email Address' inputType='email' />
                <InputLabelGroup label='password' inputPlaceholder='* * * * * * * *' labelTextContent='Password' inputType='password' />
                <DynamicFormSubmitButton isProcessing={isProcessing} />
            </form>
            <p className="text-center text-sm py-2">Already have an account? <Link href="/login" className="text-[#000] font-bold">Login</Link></p>

        </AuthFormWrapper>
    </main>

}


export default SignUp;