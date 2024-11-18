import { createSlice } from "@reduxjs/toolkit"
import { getAllGroups } from "./groupThunk"


const initialState = {
    groups: [],
    currentGroup: null,
    error: null
}

const groupSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllGroups.fulfilled, (state, action) => {
            state.groups = action.payload
        })
        .addCase(getAllGroups.rejected, (state) => {
            state.error = 'ошибка получения всех групп'
        })
    }
})

export default groupSlice.reducer

