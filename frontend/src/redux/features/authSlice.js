import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userLogin: null,
        isLogined: false
    },
    reducers: {
        setUserLogin: (state, action ) => {
            state.userLogin = action.payload.data;
            state.isLogined = true;
        },
        logout: (state, action) => {
            state.userLogin = null;
            state.isLogined = false;
        }
    }
})

export const  {setUserLogin, logout} = authSlice.actions;
export default authSlice.reducer;