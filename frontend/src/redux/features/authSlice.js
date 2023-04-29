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
    setNewPhone: (state, action) => {
      state.newPhone = action.payload.newPhone;
    },
    setNewAvatarImage: (state, action) => {
      state.newAvatarImage = action.payload.newAvatarImage;
    },
    setRole: (state, action) => {
      state.userLogin.role = action.payload.role;
    },
    logout: (state, action) => {
      state.userLogin = {};
      state.isLogined = false;
      state.newAvatarImage = null;
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    },
    setIsFetDataUser: (state, action) => {
      state.isFetchDataUser = !state.isFetchDataUser;
    },
  },
});

export const {
  setUserLogin,
  logout,
  setRole,
  setIsFetDataUser,
  setNewPhone,
  setNewAvatarImage,
} = authSlice.actions;
export default authSlice.reducer;
