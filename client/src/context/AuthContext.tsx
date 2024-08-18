"use client"
import axiosInstance from '@/utils/axios';
// contexts/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
// import axios from '';


interface UserData {
    userName: string;
    email: string;
    password: string;
    userType: string;
}
interface LoginData {
    email: string;
    password: string;
    userType: string;
}
interface OtpData {
  email: string;
  otp: string;
  userType: string;
}

interface ResendOtpData{
    userId: string,
    userType: string,
}

interface AuthState {
    isAuthenticated: boolean;
    user: UserData | null;
    token: string | null;
}

interface AuthContextType {
    authState: AuthState;
    login: (loginData: LoginData) => Promise<any>;
    register: (userData: UserData) => Promise<any>;
    logout: () => void;
    verifyOtp: (otpData: OtpData) => Promise<any>;
    resendOtp: (resendOtpData: ResendOtpData) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
        token: null,
    });

    const login = async (loginData: LoginData) => {
        try {
            // const response = await axiosInstance.post<any>('/api/auth/login', loginData);
            const response = await fetch('http://localhost:4000/api/auth/login',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(loginData),
            });
            if(!response){
                return {message:"api call failed!"};
            }
            const data  = await response.json();
            // localStorage.setItem("token", data.token);
            // localStorage.setItem("user_id", data.user_id);
            // console.log(data)
            // setAuthState({
            //     isAuthenticated: true,
            //     user: data.user,
            //     token: data.token,
            // });
            // return data;
            console.log(data);
            return "success!";
        } catch (error) {
            return console.log({message:'something went wrong!!!', error});
        }
    };

    const register = async (userData: UserData) => {
        try {
            const response = await axiosInstance.post<any>('/api/auth/register', userData);
            if(!response){
                console.error("SOmething terrible happened!! didn't get any response!");
            }
            const { data } = response;
            return data;
        } catch (error) {
            throw error;
        }
    };
    const verifyOtp =async (otpData: OtpData)=>{
      try{
        const response = await axiosInstance.post<any>('/api/auth/verify-otp', otpData);
        const { data } = response;
        return data;
      }catch(error){
        throw error;
      }
    };

    const resendOtp=async (resendData: ResendOtpData)=>{
        try{
            const response = await axiosInstance.post<any>('/api/auth/send-otp',resendData);
            if(!response){
                console.error('response was not recieved in AuthContext!!');
            };
            const { data } = response;
            console.log(data);
            return data;
        }catch(err){
            console.error(err, "error in authContext resend otp exception!!");
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id')
        setAuthState({
            isAuthenticated: false,
            user: null,
            token: null,
        });
    };

    return (
        <AuthContext.Provider value={{ authState, login, register, logout, verifyOtp, resendOtp }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
