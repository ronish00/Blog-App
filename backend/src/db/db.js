import mongoose from 'mongoose';

const connectDB = async() => {
    try{
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_DATABASE_NAME}`);
        console.log('Database connected successfully')
    }
    catch(error){
        console.log(error)
        process.exit(1);
    }
}

export {connectDB}