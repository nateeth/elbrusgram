import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./userThunk";


const initialState = {
    users: [],
    error: null
}


export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
        .addCase(getAllUsers.rejected, (state) => {
            state.error = 'ошибка получения всех юзеров'
        })
    }
})

export default userSlice.reducer