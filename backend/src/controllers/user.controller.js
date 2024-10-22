import { User } from "../models/users.model.js";

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

    if (!(fullname && email && password)) {
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

    return res.status(200).json(createdUser);
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

    if (!(email && password)) {
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
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(loggedInUser);
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
    const result = await User.findByIdAndUpdate(req.user._id, {
      $set: {
        refreshToken: null,
      }
    });
    
    console.log(result);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "User logged out" });
  } catch (error) {
    return res.status(500).json({
      message: "User logout failed",
      error: error.message || "Unknown error",
    });
  }
};

export { userRegister, userLogin, userLogout };
