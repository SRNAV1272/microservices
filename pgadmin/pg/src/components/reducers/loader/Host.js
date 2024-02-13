import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { host } from '../../../variables'
import { Load } from "./Loader"
import { Notify } from "./Notification"

const initialState = {
    address: {}
}

export const Host = createAsyncThunk(
    "Host/GetHost",
    async ({ navigate }, { dispatch }) => {
        try {
            // const formData = new FormData()
            // formData.set('params', params)
            dispatch(Load(true))
            const response = await axios.get(`${host}/host`)
            dispatch(Load(false))
            return (response.data)

        } catch (e) {
            console.error(e)
            dispatch(Load(false))
            dispatch(Notify({ msg: e.response.data.msg }))
            navigate('/error')
        }
    }
)

const HostSlice = createSlice({
    name: 'host',
    initialState,
    reducers: {
        // AddToCart: (state, action) => {
        //     // console.log(state.cartItems)
        //     const newItem = action.payload;
        //     const existingItem = state.cartItems.find(
        //         (item) => item.title === newItem.title
        //     );

        //     if (existingItem) {
        //         existingItem.quantity++;
        //         existingItem.totalItemPrice =
        //             existingItem.quantity * existingItem.disprice;
        //     } else {
        //         state.cartItems.push({ ...newItem, quantity: 1, totalItemPrice: newItem.disprice });
        //     }
        // },
        // RemoveFromCart: (state, action) => {
        //     const newItem = action.payload;
        //     const existingItem = state.cartItems.find(
        //         (item) => item.title === newItem.title
        //     );

        //     if (existingItem.quantity >= 2) {
        //         existingItem.quantity--;
        //         existingItem.totalItemPrice =
        //             existingItem.quantity * existingItem.disprice;
        //     } else {
        //         return {
        //             ...state,
        //             cartItems: state.cartItems.filter(item => item.title !== action.payload.title)
        //         }
        //     }
        // },
        // UpdateDetails: (state, action) => {
        //     return {
        //         ...state,
        //         address: { ...action.payload }
        //     }
        // }
    },
    extraReducers(builder) {
        builder
            .addCase(Host.pending, (state, action) => { })
            .addCase(Host.fulfilled, (state, action) => {
                console.log('data', action.payload)
                return {
                    ...state,
                    address: {
                        ...action.payload
                    }
                }
            })
    }
})

// export const { AddToCart, RemoveFromCart, UpdateDetails } = CartSlice.actions

export default HostSlice.reducer