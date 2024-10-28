import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      index: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    refreshToken: {
      type: String
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log("Error encrypting password", error);
  }
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function(){
    try {
        return await jwt.sign(
            {
                _id: this._id
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    } catch (error) {
        console.log('Error generating access token', error);
    }
}

userSchema.methods.generateRefreshToken = async function(){
    try {
        return await jwt.sign(
            {
                _id: this._id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    } catch (error) {
        console.log('Error generating refresh token', error);
    }
}


export const User = mongoose.model("User", userSchema);
