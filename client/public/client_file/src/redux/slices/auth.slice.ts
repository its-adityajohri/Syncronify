// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface AuthState {
//   isAuthenticated: boolean;
//   user: {
//     username: string | null;
//     password: string | null;
//     role:string | null;
//   }; // Replace 'any' with the type of your user object
// }

// const initialState: AuthState = {
//   isAuthenticated: false,
//   user:{username:null,password:null,role:null},
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login(state, action: PayloadAction<any>) {
//       state.isAuthenticated = true;
//       state.user = action.payload;
//     },
//     logout(state) {
//       state.isAuthenticated = false;
//       state.user = {username:null,password:null,role:null};
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;

// export default authSlice.reducer;


// src/features/auth/authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { RootState } from "../store"; // Adjust the import path to your store file

interface User {
  userId: string;
  userType: string;
}

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  user: null,
  error: null,
};

// Asynchronous thunk actions
export const verifyToken = createAsyncThunk("auth/verifyToken", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/verify-token", { withCredentials: true });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<{ userId: string; userType: string }>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logIn, logOut } = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
