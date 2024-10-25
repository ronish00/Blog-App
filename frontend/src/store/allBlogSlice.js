import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    allBlogs: [],
    error: null,
    loading: false
}

// Async thunk to fetch blogs
export const fetchBlogs = createAsyncThunk(
    'allBlogs/fetchBlogs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/blogs/getAllBlogs', { withCredentials: true });
            return response.data; // returning data on success
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed fetching all blogs');
        }
    }
)

const allBlogSlice = createSlice({
    name: 'allBlogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.allBlogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default allBlogSlice.reducer;
