import { User } from "../models/users.model.js";
import jwt from 'jsonwebtoken';

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Failed to generate tokens", error);
  }
};

const userRegister = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!(fullname.trim() && email.trim() && password.trim())) {
      throw new Error("All fields are required");
    }

    const userExits = await User.findOne({ email });

    if (userExits) {
      throw new Error("User already exists");
    }

    const user = await User.create({ fullname, email, password });
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      throw new Error("User creation failed");
    }

    return res.status(200).json({
      user: createdUser,
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create user",
      error: error.message || "Unknown error",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email.trim() && password.trim())) {
      throw new Error("All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new Error("Password is incorrect");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const loggedInUser = await User.findOne({ email }).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None'
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        user: loggedInUser,
        message: "user logged in successfully",
        success: true,
      });
  } catch (error) {
    return res.status(500).json({
      message: "User login failed",
      error: error.message || "Unknown error",
    });
  }
};

const userLogout = async (req, res) => {
  //clear cookie
  //clear token
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $set: { refreshToken: "" },
    });

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None'
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "User logged out", success: true });
  } catch (error) {
    return res.status(500).json({
      message: "User logout failed",
      error: error.message || "Unknown error",
    });
  }
};

const getCurrentUser = (req, res) => {
  try {
    return res.status(200).json({
      user: req.user,
      message: "User fetched successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching user",
      error: error.message || "Unknown error",
    });
  }
};

const changeCurrentPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      throw new Error("All fields are required");
    }

    const user = await User.findById(req.user._id);

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      throw new Error("Your current password is incorrect");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json({ message: "Password updated successfully", success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating password",
      error: error.message || "Unknown error",
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const incomingToken = req.cookies.refreshToken || req.body.refreshToken;
    if(!incomingToken){
      throw new Error('Unauthorized access');
    }
    
    const decodedToken = jwt.verify(incomingToken, process.env.REFRESH_TOKEN_SECRET);

    if(!decodedToken){
      throw new Error("Invalid refresh Token");
    }
  
    const user = await User.findById(decodedToken._id);
    if(!user){
      throw new Error("Invalid refresh Token")
    }
  
    if(incomingToken !== user.refreshToken){
      throw new Error("Refresh Token is used or expired")
    }
  
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
  
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None'
    };
  
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      {
        message: "Access Token refreshed"
      }
    )
  } catch (error) {
    return res
    .status(500)
    .json({
      message: "Error while generating access token",
      error: error.message || 'unknown error'
    })
  }
}

export {
  userRegister,
  userLogin,
  userLogout,
  getCurrentUser,
  changeCurrentPassword,
  refreshToken
};
