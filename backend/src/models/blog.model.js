import mongoose, {Schema} from 'mongoose';

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    featuredImage: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: String
    }
}, {timestamps: true})

export const Blog = mongoose.model("Blog", blogSchema)