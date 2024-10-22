import mongoose, {Schema} from "mongoose";

const categorySchema = new Schema({
    Fashion: {
        type: String,
    },
    Travel: {
        type: String,
    },
    Technology: {
        type: String,
    },
    Lifestyle: {
        type: String,
    },
    Videos: {
        type: String,
    },
    Education: {
        type: String,
    }
}, {timestamps: true})

export const Category = mongoose.model("Category", categorySchema)