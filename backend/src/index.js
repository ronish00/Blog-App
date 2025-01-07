import dotenv from 'dotenv';
import { app } from './app.js';
import {connectDB}  from './db/db.js';


connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`App is listening on ${process.env.PORT}`);
    })
})
.catch(() => {
    console.log(`Failed to listen on ${process.env.PORT}`);
})