"use client"

import React from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserRegister() {

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [otp, setOTP] = React.useState('');

    const [showOTP, setShowOTP] = React.useState(false);

    const OTPSendNotify = () => {
        return toast.success("OTP sent successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

    const OTPVerifyNotify = () => {
        return toast.success("OTP verified successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowOTP(true);
        OTPSendNotify();
    }

    const handleSubmitOTP = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowOTP(false);
        OTPVerifyNotify();
    }

    return (
        <>
            <div className="flex items-center justify-center w-full">
                <div className={`mx-auto w-full max-w-lg bg-[#1B1B1B] text-slate-100 rounded-xl p-8 border border-white/10`}>
                    <div className="mb-2 flex justify-center">
                            <span className="inline-block w-full max-w-[100px] -m-2">
                                <h1>Logo</h1>
                            </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                    <p className="mt-2 text-center text-base text-slate-100/60">
                        Already have an account?&nbsp;
                        <Link
                            href="/"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className='space-y-2'>
                            <label
                                htmlFor='username'
                                className="inline-block mt-2 pl-1"
                            >Username</label>
                            <input
                                type='text' 
                                id='username'
                                value={username}
                                readOnly={showOTP}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`px-3 py-2 rounded-lg outline-none duration-200 border bg-[#1B1B1B] text-slate-50 border-gray-200 w-full focus:bg-gray-50 focus:text-black ${showOTP && 'opacity-50'}`}
                                placeholder='Username' />
                        </div>

                        <div className='space-y-2'>
                            <label 
                                htmlFor='email'
                                className="inline-block mt-2 pl-1"
                            >Email</label>
                            <input
                                type='email'
                                id='email'
                                value={email}
                                readOnly={showOTP}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`px-3 py-2 rounded-lg outline-none duration-200 border bg-[#1B1B1B] text-slate-50 border-gray-200 w-full focus:bg-gray-50 focus:text-black ${showOTP && 'opacity-50'}`}
                                placeholder='Email' />
                        </div>

                        <div className='space-y-2'>
                            <label
                                htmlFor='password'
                                className="inline-block mt-2 pl-1"
                            >Password</label>
                            <input
                                type='password'
                                id='password'
                                value={password}
                                readOnly={showOTP}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`px-3 py-2 rounded-lg outline-none duration-200 border bg-[#1B1B1B] text-slate-50 border-gray-200 w-full focus:bg-gray-50 focus:text-black ${showOTP && 'opacity-50'}`}
                                placeholder='Password' />
                        </div>

                        <div className='space-y-5 pt-4'>
                            <button
                            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                            >SignUp</button>
                        </div>
                    </form>

                    {showOTP && 
                        <form onSubmit={handleSubmitOTP}>
                            <div className='space-y-2'>
                                <label
                                    htmlFor="otp"
                                    className="inline-block mt-2 pl-1"
                                >OTP</label>
                                <input
                                    type="text"
                                    name="otp"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOTP(e.target.value)}
                                    className={`px-3 py-2 rounded-lg outline-none duration-200 border bg-[#1B1B1B] text-slate-50 border-gray-200 w-full focus:bg-gray-50 focus:text-black `}
                                    />
                            </div>
                            <div className='space-y-5 pt-4'>
                                <button
                                className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                                >Verify</button>
                            </div>
                        </form>
                    }
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default UserRegister
