import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosInstance";

export type WallPostsState = {
    posts: WallPostsT[] | undefined;
}

export type WallPostsT = {
  id: number | undefined;
  userid: number | undefined;
  wallreaction: string | undefined;
  authorid?: number | undefined;
};

export const loadWallPostsThunk = createAsyncThunk(
    'posts/loadWallPostsThunk',
    async (id) => {
        try {
            const response = await axiosInstance.get<WallPostsT[]>(`/wallelements/${id}`);
            return response.data
        } catch (error) {
            console.log('Ошибка запроса при загрузке постов', error);
    }}
);