import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import homeSlice from './features/homeSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        createHome: homeSlice
    },
})
export default store;