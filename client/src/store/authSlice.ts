import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance, { setAccessToken } from '../utils/axiosInstance';
import { LoginResponse, type AuthState, type UserData } from '../types/authtypes';
import { RootState } from './index';

const initialState: AuthState = {
    user: undefined,
    role: 'guest',
    status: 'idle',
    error: '',
};

export const refreshTokens = createAsyncThunk(
  'auth/refresh',
  async (_,{ rejectWithValue }) => {
    try {
        const response = await axiosInstance.get<LoginResponse >('/tokens/refresh');
        const { user, accessToken } = response.data;
        setAccessToken(accessToken);
        return {user};
    } catch (error) {
         return rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async(credentials: UserData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<LoginResponse> ('/auth/login', credentials);
            const { user, accessToken } = response.data;
            setAccessToken(accessToken);
            return {user};
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to login';
            return rejectWithValue(errorMessage);
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async() => { 
        await axiosInstance.post('/auth/logout')
        return {};
    }
)

const authSlicer = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(refreshTokens.fulfilled, (state, action) => {     
            state.user = action.payload.user;
            state.role = 'user';
            state.status = 'succeeded';
          })
          .addCase(refreshTokens.rejected, (state) => {
            state.user = undefined;
            state.role = 'guest';
            state.status = 'idle';
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.role = 'user';
            state.status = 'succeeded';
          })
          .addCase(loginUser.rejected, (state) => {
            state.user = undefined;
            state.role = 'guest';
            state.status = 'idle';
          });
    },
});

export const selectAuth = (state: RootState): AuthState => state.auth;

export default authSlicer.reducer;