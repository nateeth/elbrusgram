import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../../utils/axiosInstance"


export const getAllGroups = createAsyncThunk('/groups/getAllGroups', async () => {
    const groups = await axiosInstance.get('/groups')
    return groups.data
})

export const addGroup = createAsyncThunk('/groups/addGroup', async () => {
    
})