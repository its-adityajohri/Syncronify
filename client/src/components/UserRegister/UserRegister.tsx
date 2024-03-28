"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function UserRegister({handleClick}) {

    const[newUser, setNewUser]=useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
        role:'',
    })


    const handleChange=(e:any)=>{
        const {name, value}=e.target;
        setNewUser({...newUser, [name]: value});
    }

    const RegisteredNotify = () => {
        return toast.success("User registered successfully", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
        });
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(newUser);
        try{
            // const response =await axios.post('/api/users',newUser);
            // const {data}=response;
            // console.log(data);
            RegisteredNotify();
            setTimeout(()=>{
                handleClick();
            },4000);
        }catch(err){
            console.log(err);
        }
    }


    return (
        <>
            <div className="flex items-center justify-center w-full">
                <div className={`mx-auto w-full max-w-lg text-[#1B1B1B] bg-slate-100 rounded-xl p-10 border border-white/10`}>
                    {/* <div className="mb-2 flex justify-center">
                            <span className="inline-block w-full max-w-[100px] -m-2">
                                <h1>Logo</h1>
                            </span>
                    </div> */}
                    <div className="mx-auto text-5xl p-10 w-32 h-32">
                        {/* <span className="inline-block w-full max-w-[100px] p-10"> */}
                        <img src="" alt="SF" className='object-cover'/>
                            {/* <h1 className='text-5xl p-10 font-bold'>SF</h1> */}
                        {/* </span> */}
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                    <p className="mt-2 text-center text-base text-[#1B1B1B]">
                        Already have an account?&nbsp;
                        <Link
                            href="authentication" onClick={handleClick}
                            className="font-semibold text-primary text-blue-900 transition-all duration-200 hover:underline"
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
                                name='username'
                                value={newUser.username}
                                // readOnly={showOTP}
                                onChange={handleChange}
                                className={`px-3 py-2 rounded-lg outline-none duration-200 border text-[#1B1B1B] bg-slate-50 border-gray-200 w-full focus:text-gray-50 focus:bg-black`}
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
                                name='email'
                                value={newUser.email}
                                // readOnly={showOTP}
                                onChange={handleChange}
                                className={`px-3 py-2 rounded-lg outline-none duration-200 border text-[#1B1B1B] bg-slate-50 border-gray-200 w-full focus:text-gray-50 focus:bg-black`}
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
                                name='password'
                                value={newUser.password}
                                // readOnly={showOTP}
                                onChange={handleChange}
                                className={`px-3 py-2 rounded-lg outline-none duration-200 border text-[#1B1B1B] bg-slate-50 border-gray-200 w-full focus:text-gray-50 focus:bg-black`}
                                placeholder='Password' />
                        </div>

                        <div className='space-y-2'>
                            <label
                                htmlFor='password'
                                className="inline-block mt-2 pl-1"
                            >Confirm Password</label>
                            <input
                                type='password'
                                id='password'
                                name='confirmPassword'
                                value={newUser.confirmPassword}
                                // readOnly={showOTP}
                                onChange={handleChange}
                                className={`px-3 py-2 rounded-lg outline-none duration-200 border text-[#1B1B1B] bg-slate-50 border-gray-200 w-full focus:text-gray-50 focus:bg-black`}
                                placeholder='Password' />
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor="role" className='inline-block mt-2 pl-1 text-bf'>Select Role:</label>
                            <select id="role" name='role' value={newUser.role} onChange={handleChange} className='px-3 py-2 rounded-lg outline-none duration-200 border text-[#1B1B1B] bg-slate-50 border-gray-200 w-full focus:text-gray-50 focus:bg-black'>
                                <option value="">Select a role</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="application admin">Application Admin</option>
                                {/* Add more options as needed */}
                            </select>
                            {/* Display selected role */}
                            {/* {selectedRole && <p>Selected Role: {selectedRole}</p>} */}
                        </div>

                        <div className='space-y-5 pt-4'>
                            <button
                            className={`w-full bg-slate-900 hover:bg-slate-950 text-slate-50 font-bold py-2 px-4 rounded-lg`}
                            >SignUp</button>
                        </div>
                    </form>

                    {/* {showOTP && 
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
                                    className={`px-3 py-2 rounded-lg outline-none duration-200 border text-[#1B1B1B] bg-slate-50 border-gray-200 w-full focus:text-gray-50 focus:bg-black`}
                                    />
                            </div>
                            <div className='space-y-5 pt-4'>
                                <button
                                className={`w-full bg-slate-900 hover:bg-slate-950 text-slate-50 font-bold py-2 px-4 rounded-lg`}
                                >Verify</button>
                            </div>
                        </form>
                    } */}
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default UserRegister
