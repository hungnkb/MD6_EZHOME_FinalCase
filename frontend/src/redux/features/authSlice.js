import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userLogin: {},
    isLogined: false,
    isFetchDataUser: false,
  },
  reducers: {
    setUserLogin: (state, action) => {
      state.userLogin = action.payload.userLogin;
      state.isLogined = action.payload.isLogined;
    },
    setRole: (state, action) => {
      state.userLogin.role = action.payload.role;
    },
    logout: (state, action) => {
      state.userLogin = {};
      state.isLogined = false;
      localStorage.removeItem('token')
      localStorage.removeItem('email')

      // localStorage.clear();
    },
    setIsFetDataUser: (state, action) => {
      state.isFetchDataUser = !state.isFetchDataUser;
    },
  },
});

export const { setUserLogin, logout, setRole, setIsFetDataUser } =
  authSlice.actions;
export default authSlice.reducer;
