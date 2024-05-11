import React from 'react'

const AuthFormWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='bg-white p-3 px-6 max-w-md rounded-md w-full '>
            {children}
        </div>
    )
}

export default AuthFormWrapper