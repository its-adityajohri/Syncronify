"use client"
import axiosInstance from '@/utils/axios';
// contexts/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
// import axios from '';


interface UserData {
    username: string;
    email: string;
    password: string;
    userType: string;
}
interface LoginData {
    username: string;
    password: string;
    userType: string;
}
interface OtpData {
  email: string;
  otp: string;
  userType: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: UserData | null;
    token: string | null;
}

interface AuthContextType {
    authState: AuthState;
    login: (userData: UserData) => Promise<any>;
    register: (userData: UserData) => Promise<any>;
    logout: () => void;
    verifyOtp: (otpData: OtpData) => Promise<any>;
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
            const response = await axiosInstance.post<any>('/api/auth/login', loginData);
            const { data } = response;
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);
            console.log(data)
            setAuthState({
                isAuthenticated: true,
                user: data.user,
                token: data.token,
            });
            return data;
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData: UserData) => {
        try {
            const response = await axiosInstance.post<any>('/api/auth/register', userData);
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
        <AuthContext.Provider value={{ authState, login, register, logout, verifyOtp }}>
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
