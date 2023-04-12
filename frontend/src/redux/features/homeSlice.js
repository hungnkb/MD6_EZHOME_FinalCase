import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: 'homeCreate',
    initialState: {
            title: null,
            price: null,
            address: null,
            bathrooms: null,
            bedrooms: null,
            description: null,
            idCategory: null,
            files: null,
    },
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setPrice: (state, action) => {
            state.price = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        setBath: (state, action) => {
            state.bathrooms = action.payload;
        },
        setBed: (state, action) => {
            state.bedrooms = action.payload;
        },
        setDesc: (state, action) => {
            state.description = action.payload;
        },
        setCategory: (state, action) => {
            state.idCategory = action.payload;
        },
        setFiles: (state, action) => {
            state.files = action.payload;
        }
    }
})

export const { setTitle, setPrice, setAddress, setBath, setBed, setDesc, setCategory, setFiles } = homeSlice.actions;
export default homeSlice.reducer;