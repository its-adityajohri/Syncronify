import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    username: string | null;
    password: string | null;
  }; // Replace 'any' with the type of your user object
}

const initialState: AuthState = {
  isAuthenticated: false,
  user:{username:null,password:null},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<any>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = {username:null,password:null};
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
