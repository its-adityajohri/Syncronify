// components/UserRegister.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext'; // Adjust the import path as necessary
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';

interface NewUser {
    userName: string;
    email: string;
    password: string;
    userType: string;
}

interface Props {
    handleClick: () => void;
}

const UserRegister: React.FC<Props> = ({ handleClick }) => {
    const [newUser, setNewUser] = useState<NewUser>({
        userName: '',
        email: '',
        password: '',
        userType: '',
    });
    const [showOtp, setShowOtp]=useState(false);
    const [inputOtp, setInputOtp]=useState("");
    const [showCode, setShowCode]=useState(false);
    const [inputCode, setInputCode]=useState("");

    const { register, verifyOtp } = useAuth();

    const handleSubmitOtp= async (e:FormEvent)=>{
        const{email, userType}=newUser;
        const otp=inputOtp;
        const reqData={otp, email, userType}
        e.preventDefault();
        try {
            const response=await verifyOtp(reqData);
            toast.success("otp verified successfully", { position: "top-right", autoClose: 4000 });
            console.log(response)
        } catch (err) {
            toast.error(err.message, {position:'top-right', autoClose:4000});
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const data = await register(newUser);
            toast.success("User registered successfully", { position: "top-right", autoClose: 4000 });
            if(newUser.userType==='adminUser'){
                setShowCode(true);
            }
            setShowOtp(true);
        } catch (err) {
            toast.error(err.message, { position: "top-right", autoClose: 4000 });
        }
    };

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
                                id='userName'
                                name='userName'
                                value={newUser.userName}
                                readOnly={showOtp}
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
                                readOnly={showOtp}
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
                                readOnly={showOtp}
                                onChange={handleChange}
                                className={`px-3 py-2 rounded-lg outline-none duration-200 border text-[#1B1B1B] bg-slate-50 border-gray-200 w-full focus:text-gray-50 focus:bg-black`}
                                placeholder='Password' />
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor="role" className='inline-block mt-2 pl-1 text-bf'>Select Role:</label>
                            <select id="userType" name='userType' disabled={showOtp} value={newUser.userType} onChange={handleChange} className='px-3 py-2 rounded-lg outline-none duration-200 border text-[#1B1B1B] bg-slate-50 border-gray-200 w-full focus:text-gray-50 focus:bg-black'>
                                <option value="">Select a role</option>
                                <option value="genUser">User</option>
                                <option value="adminUser">Admin</option>
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
                    {showCode&&
                    <form onSubmit={handleCodeSubmit}>
                        <div className='space-y-2'>
                                <label
                                    htmlFor="Varification"
                                    className="inline-block mt-2 pl-1"
                                >Varification Code</label>
                                <input
                                    type="text"
                                    name=""
                                    id="otp"
                                    value={inputOtp}
                                    onChange={(e) => setInputOtp(e.target.value)}
                                    className={`px-3 py-2 rounded-lg outline-none duration-200 border text-[#1B1B1B] bg-slate-50 border-gray-200 w-full focus:text-gray-50 focus:bg-black`}
                                    />
                            </div>
                            <div className='space-y-5 pt-4'>
                                <button
                                className={`w-full bg-slate-900 hover:bg-slate-950 text-slate-50 font-bold py-2 px-4 rounded-lg`}
                                >Verify</button>
                            </div>
                    </form>
                    }

                    {showOtp && 
                        <form onSubmit={handleSubmitOtp}>
                            <div className='space-y-2'>
                                <label
                                    htmlFor="otp"
                                    className="inline-block mt-2 pl-1"
                                >OTP</label>
                                <input
                                    type="text"
                                    name="otp"
                                    id="otp"
                                    value={inputOtp}
                                    onChange={(e) => setInputOtp(e.target.value)}
                                    className={`px-3 py-2 rounded-lg outline-none duration-200 border text-[#1B1B1B] bg-slate-50 border-gray-200 w-full focus:text-gray-50 focus:bg-black`}
                                    />
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
    );
}

export default UserRegister;
