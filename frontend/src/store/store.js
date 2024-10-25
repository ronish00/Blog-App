import {configureStore} from  '@reduxjs/toolkit'
import authSlice from './authSlice.js'
import myBlogSlice from './myBlogSlice.js'
import allBlogSlice from './allBlogSlice.js'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        myBlogs: myBlogSlice,
        allBlogs: allBlogSlice
    }
})