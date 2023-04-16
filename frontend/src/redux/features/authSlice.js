import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userLogin: {},
    isLogined: false,
  },
  reducers: {
    setUserLogin: (state, action) => {
      state.userLogin = action.payload.userLogin;
      state.isLogined = action.payload.isLogined;
    },
    setRole: (state, action) => {
      state.userLogin.role = action.payload.role
    }
    ,
    logout: (state, action) => {
      state.userLogin = {};
      state.isLogined = false;
      localStorage.removeItem('token');
    },
  },
});

export const { setUserLogin, logout, setRole } = authSlice.actions;
export default authSlice.reducer;
