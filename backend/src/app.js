import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'https://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json({limit: '50kb'}));
app.use(express.urlencoded({extended: true, limit: '50kb'}));

//import router
import userRouter from './routes/user.route.js'
import blogRouter from './routes/blog.route.js'

//router declaration
app.use('/api/v1/users', userRouter)
app.use('/api/v1/blogs', blogRouter)


export { app };
