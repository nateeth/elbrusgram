import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const getAllUsers = createAsyncThunk('/users/getAllUsers', async () => {
    const allUsers = await axiosInstance.get('/users')
    return allUsers.data
})