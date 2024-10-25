import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    blogs: []
};

const myBlogSlice = createSlice({
    name: 'myBlogs',
    initialState,
    reducers: {
        createBlog: (state, action) => {
            state.blogs.push(action.payload);
        },
        deleteBlog: (state, action) => {
            state.blogs.filter(blog => blog.id !== action.payload);
        },
        updateBlog: (state, action) => {
            const {id, title, content, featuredImage} = action.payload;
            const existingBlog = state.blogs.find(blog => blog.id === id);
            if(existingBlog){
                existingBlog.title = title;
                existingBlog.content = content;
                existingBlog.featuredImage = featuredImage;
            }
        },
        setBlogs: (state, action) => {
            state.blogs = action.payload;
        }
    }
})

export const {createBlog, deleteBlog, updateBlog, setBlogs} = myBlogSlice.actions;

export default myBlogSlice.reducer