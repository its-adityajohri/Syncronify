import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
// import { showSnackbar } from "./app";
import { AppThunk } from "../../store";

interface AuthState {
  isLoggedIn: boolean;
  token: string;
  isLoading: boolean;
  user: any; // Consider defining a more specific type
  user_id: string | null;
  email: string;
  error: boolean;
}

interface LoginPayload {
  isLoggedIn: boolean;
  token: string;
  user_id: string;
}

interface IsLoadingPayload {
  isLoading: boolean;
  error: boolean;
}

interface RegisterEmailPayload {
  email: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  user: null,
  user_id: null,
  email: "",
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action: PayloadAction<IsLoadingPayload>) {
      state.error = action.payload.error;
      state.isLoading = action.payload.isLoading;
    },
    logIn(state, action: PayloadAction<LoginPayload>) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
    },
    signOut(state) {
      state.isLoggedIn = false;
      state.token = "";
      state.user_id = null;
    },
    updateRegisterEmail(state, action: PayloadAction<RegisterEmailPayload>) {
      state.email = action.payload.email;
    },
  },
});

export const { updateIsLoading, logIn, signOut, updateRegisterEmail } = authSlice.actions;

export default authSlice.reducer;

export const loginUser = (formValues: any): AppThunk => async (dispatch, getState) => {
  dispatch(updateIsLoading({ isLoading: true, error: false }));
  try {
    const response = await axios.post("/auth/login", formValues, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(logIn({
      isLoggedIn: true,
      token: response.data.token,
      user_id: response.data.user_id
    }));
    window.localStorage.setItem("user_id", response.data.user_id);
    dispatch(showSnackbar({ severity: "success", message: response.data.message }));
    dispatch(updateIsLoading({ isLoading: false, error: false }));
  } catch (error) {
    console.error(error);
    dispatch(showSnackbar({ severity: "error", message: error.message }));
    dispatch(updateIsLoading({ isLoading: false, error: true }));
  }
};


export const logoutUser = (): AppThunk => async (dispatch) => {
  window.localStorage.removeItem("user_id");
  dispatch(signOut());
};


interface RegisterFormValues {
  email: string;
  password: string;
  userName: string;
  userType: string;
}

export const registerUser = (formValues: RegisterFormValues): AppThunk => async (dispatch) => {
  dispatch(updateIsLoading({ isLoading: true, error: false }));
  try {
    const response = await axios.post("/auth/register", formValues, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(updateRegisterEmail({ email: formValues.email }));
    dispatch(showSnackbar({ severity: "success", message: response.data.message }));
    dispatch(updateIsLoading({ isLoading: false, error: false }));
    // Optionally redirect or perform further actions
    if (!dispatch(getState()).auth.error) {
      window.location.href = "/auth/verify";  // Redirect after successful registration
    }
  } catch (error) {
    console.error(error);
    dispatch(showSnackbar({ severity: "error", message: error.message }));
    dispatch(updateIsLoading({ error: true, isLoading: false }));
  }
};


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


// // import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// // interface AuthState {
// //   isAuthenticated: boolean;
// //   user: {
// //     username: string | null;
// //     password: string | null;
// //     role:string | null;
// //   }; // Replace 'any' with the type of your user object
// // }

// // const initialState: AuthState = {
// //   isAuthenticated: false,
// //   user:{username:null,password:null,role:null},
// // };

// // const authSlice = createSlice({
// //   name: 'auth',
// //   initialState,
// //   reducers: {
// //     login(state, action: PayloadAction<any>) {
// //       state.isAuthenticated = true;
// //       state.user = action.payload;
// //     },
// //     logout(state) {
// //       state.isAuthenticated = false;
// //       state.user = {username:null,password:null,role:null};
// //     },
// //   },
// // });

// // export const { login, logout } = authSlice.actions;

// // export default authSlice.reducer;


// // src/features/auth/authSlice.ts
// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "../../utils/axios";
// import { RootState } from "../../app/store"; // Adjust the import path to your store file

// interface User {
//   userId: string;
//   userType: string;
// }

// interface AuthState {
//   isLoggedIn: boolean;
//   isLoading: boolean;
//   user: User | null;
//   error: string | null;
// }

// const initialState: AuthState = {
//   isLoggedIn: false,
//   isLoading: false,
//   user: null,
//   error: null,
// };

// // Asynchronous thunk actions
// export const verifyToken = createAsyncThunk("auth/verifyToken", async (_, { rejectWithValue }) => {
//   try {
//     const response = await axios.get("/verify-token", { withCredentials: true });
//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(error.message);
//   }
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logIn: (state, action: PayloadAction<{ userId: string; userType: string }>) => {
//       state.isLoggedIn = true;
//       state.user = action.payload;
//     },
//     logOut: (state) => {
//       state.isLoggedIn = false;
//       state.user = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(verifyToken.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(verifyToken.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isLoggedIn = true;
//         state.user = action.payload;
//       })
//       .addCase(verifyToken.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { logIn, logOut } = authSlice.actions;

// // Selectors
// export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
// export const selectUser = (state: RootState) => state.auth.user;

// export default authSlice.reducer;
