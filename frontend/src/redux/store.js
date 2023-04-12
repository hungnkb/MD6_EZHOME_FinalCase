import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
// import cartReducer from './features/cart/cartSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        
    },
})
export default store;