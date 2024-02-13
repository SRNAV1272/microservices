import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { host } from '../../../variables'
import { Load } from "./Loader"
import { Notify } from "./Notification"

const initialState = {
    tables: [],
    header: {},
    status: ''
}

export const getTables = createAsyncThunk(
    "Tables/GetTables",
    async ({ navigate }, { dispatch }) => {
        try {
            dispatch(Load(true))
            const response = await axios.get(`${host}/list_tables`)
            console.log(response.data)
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

export const deleteTables = createAsyncThunk(
    "Tables/DeleteTable",
    async ({ name, navigate }, { dispatch }) => {
        try {
            dispatch(Load(true))
            const response = await axios.delete(`${host}/delete_table`, { data: { table_name: name } })
            dispatch(getTables({ navigate }, { dispatch }))
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

export const getColumn = createAsyncThunk(
    "Tables/getColumn",
    async ({ name, navigate }, { dispatch }) => {
        try {
            dispatch(Load(true))
            const response = await axios.post(`${host}/get_columns`, { data: { table_name: name } })
            // dispatch(getTables({ navigate }, { dispatch }))
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

const TableSlice = createSlice({
    name: 'tables',
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
            .addCase(getTables.pending, (state, action) => { })
            .addCase(getTables.fulfilled, (state, action) => {
                return {
                    ...state,
                    tables: action.payload,
                    header: action.payload[0] === undefined ? {} : action.payload[0]
                }
            })
            .addCase(deleteTables.pending, (state, action) => { })
            .addCase(deleteTables.fulfilled, (state, action) => {
                return {
                    ...state,
                    status: action.payload
                }
            })
            .addCase(getColumn.pending, (state, action) => { })
            .addCase(getColumn.fulfilled, (state, action) => {
                console.log(action.payload)
                // return {
                //     ...state,
                //     status: action.payload
                // }
            })
    }
})

// export const { AddToCart, RemoveFromCart, UpdateDetails } = CartSlice.actions

export default TableSlice.reducer