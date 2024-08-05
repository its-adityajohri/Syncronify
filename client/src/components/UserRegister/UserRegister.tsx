"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

function UserRegister({handleClick}) {

    const router=useRouter();

    const {register, verifyOtp, resendOtp}=useAuth()

    const[newUser, setNewUser]=useState({
        userName:'',
        email:'',
        password:'',
        userType:'',
    });
    const [sentOtp, setSentOtp]=useState(false);
    const [otp, setOtp]=useState('');
    const [isTimeUp, setIsTimeUp]=useState(false);
    const [timer, setTimer]=useState<number>(30);
    const [user, setUser]=useState<any>({
        userId:"",
        userType:""
    });

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setIsTimeUp(true);
        }
    }, [timer]);
    


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
            const response =await register(newUser);
            const {user}=response;
            console.log(user);
            setUser({userId:user.userId, userType:user.userType});
            if(response.message=="OTP Sent Successfully!"){
                setSentOtp(true);
                setTimer(30);
            }
            RegisteredNotify();
            setTimeout(()=>{
                // handleClick();
            },4000);
        }catch(err){
            console.log(err);
        }
    };

    const handleSubmitOtp=async (event:any)=>{
        event.preventDefault();
        const {email, userType} = newUser;
        const response=await verifyOtp({email, otp, userType});
        event?.preventDefault()
        console.log('verified!', response);
        if(response.status==='success'){
            toast.success("User verified successfully", {
                // 
            });
            setTimeout(()=>{
                switch(userType){
                    case "genUser":
                        router.push('/dashboard');
                        break;
                    case "adminUser":
                        router.push('/admin-dashboard');
                        break;
                    case "applicationAdminUser":
                        router.push('/application-admin-dashboard');
                        break;
                    default:
                        break;
                }
            },4000);
        }
        else{
            alert("wrong otp!!");
            setSentOtp(false);
        }
    };

    const handleResendOtp=async (event:any)=>{
        event?.preventDefault();
        console.log("user",user);
        const {userId, userType}=user;
        // await resendOtp({userId, userType});
        console.log('sent otp successfully!');
        // 
        
        setTimer(30);
        setIsTimeUp(false);
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

                    {!sentOtp && <form onSubmit={handleSubmit}>
                        <div className='space-y-2'>
                            <label
                                htmlFor='userName'
                                className="inline-block mt-2 pl-1"
                            >Username</label>
                            <input
                                type='text' 
                                id='userName'
                                name='userName'
                                value={newUser.userName}
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
                            <label htmlFor="role" className='inline-block mt-2 pl-1 text-bf'>Select Role:</label>
                            <select id="userType" name='userType' value={newUser.userType} onChange={handleChange} className='px-3 py-2 rounded-lg outline-none duration-200 border text-[#1B1B1B] bg-slate-50 border-gray-200 w-full focus:text-gray-50 focus:bg-black'>
                                <option value="">Select a role</option>
                                <option value="genUser">User</option>
                                <option value="adminUser">Admin</option>
                                <option value="applicationAdminUser">Application Admin</option>
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
                    </form>}

                    {sentOtp && 
                        <form onSubmit={handleSubmitOtp}>
                            <div className='space-y-2 flex flex-col'>
                                <label
                                    htmlFor="otp"
                                    className="inline-block mt-2 pl-1"
                                >OTP</label>
                                <input
                                    type="text"
                                    name="otp"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className={`px-3 py-2 rounded-lg outline-none duration-200 border text-[#1B1B1B] bg-slate-50 border-gray-200 w-full focus:text-gray-50 focus:bg-black`}
                                    />
                                    <div className="ml-auto"><button onClick={handleResendOtp} disabled={!isTimeUp} className='bg-transparent text-sm text-blue-500'>{isTimeUp?"Resend OTP":`Resend in ${timer} seconds.`}</button></div>
                            </div>
                            <div className='space-y-5 pt-4'>
                                <button
                                className={`w-full bg-slate-900 hover:bg-slate-950 text-slate-50 font-bold py-2 px-4 rounded-lg`}
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
