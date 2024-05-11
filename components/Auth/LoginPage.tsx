"use client"
import DynamicAuthHeader from '@/components/Auth/DynamicAuthHeader'
import React, { useState } from 'react';
import Link from 'next/link';
import AuthFormWrapper from '@/components/Auth/AuthFormWrapper';
import DynamicFormSubmitButton from '@/components/Auth/DynamicFormSubmitButton';
import { SignInProps, signInAction } from '@/actions/user/actions.user';
import InputLabelGroup from '@/components/Auth/InputLabelGroup';
import { useRouter } from 'next/navigation';
import { queryClient } from '@/components/global/QueryClientProvider';
import transformFormDataToObject from '@/utils/transformFormDataToObject';

const Login = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        // Prevent Default
        e.preventDefault();
        setIsProcessing(true);
        const rawObject = transformFormDataToObject<SignInProps>(e.target as HTMLFormElement);
        const result = await signInAction(rawObject);
        // If the login was successful, we redirect the user to the homepage and invalidate the user tag to perform a refetch in the navbar
        if (result.success) {
            router.push('/');
            await queryClient.setQueryData(['user'], result.user)
        }
    }

    return (
        <main className="flex-1 items-center justify-center flex flex-col ">
            <AuthFormWrapper>
                <DynamicAuthHeader />
                <form className='auth-form' onSubmit={handleSubmit}>
                    {/* Inputs */}
                    <InputLabelGroup
                        label='email'
                        inputPlaceholder='Please enter your email address'
                        inputProps={{ autoComplete: 'off' }}
                        inputType='email'
                        labelTextContent='Email Address'
                    />
                    <InputLabelGroup
                        label='password'
                        inputPlaceholder='* * * * * * * *'
                        inputType='password'
                        labelTextContent='Password'
                    />
                    {/* Forgot Password */}
                    <div className='py-2 flex justify-end text-base '>
                        <Link href={'#'} className='font-medium text-black underline text-sm'>Forgot Password?</Link>
                    </div>
                    {/* Form Submission Button */}
                    <DynamicFormSubmitButton isProcessing={isProcessing} />
                </form>
                {/* Olive Branch to sign up instead */}
                <p className="text-center text-sm py-2">Don't have an account yet? <Link href="/sign-up" className="text-[#000] font-semibold">Sign Up</Link></p>
            </AuthFormWrapper>

        </main>
    )
}
export default Login;