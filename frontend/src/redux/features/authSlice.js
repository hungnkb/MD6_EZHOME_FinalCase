import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userLogin: {},
    isLogined: false,
  },
  reducers: {
    setUserLogin: (state, action) => {
      console.log(action.payload);
      state.userLogin = action.payload.userLogin;
      state.isLogined = action.payload.isLogined;
    },
    logout: (state, action) => {
      state.userLogin = null;
      state.isLogined = false;
    },
  },
});

export const { setUserLogin, logout } = authSlice.actions;
export default authSlice.reducer;
