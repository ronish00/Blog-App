import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
    credentials: true
}));

//import router
import userRouter from './routes/user.route.js'
import blogRouter from './routes/blog.route.js'

//router declaration
app.use('/api/v1/users', userRouter)
app.use('/api/v1/blogs', blogRouter)


export { app };
