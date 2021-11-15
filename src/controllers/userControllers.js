import { User } from "../model/userModel.js";
import ErrorResponse from "../utils/errorResponse.js";
import { sendEmail } from "../utils/sendEmail.js";
import makeInstance from "../utils/seedHandler.js";
import crypto from "crypto";

export const register = async (req, res, next) => {
  const { email, name, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorResponse("User already exist", 400));
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    sendToken(user, 201, res);
    console.log(user);
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ status: false, error: error.mesage });
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    const message = `
      <h3>You have requested a password reset</h3>
      <p>Please click on this link to reset your password, or you can copy
      and paste in your browser address bar:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

      <p>Regards,</p>
      <p>GSECT-manager Team.</p>
    `;
    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Reset Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      data: "Password Reset Success",
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res) => {
  const PAGE_SIZE = 20;
  let page = 1;
  let skip;

  if (req.query.page) {
    page = Number(req.query.page);
    skip = (page - 1) * PAGE_SIZE;
  }

  try {
    const user = await User.find({}).populate().lean().exec();
    const docCount = await User.find({}).countDocuments();
    return res.status(201).json({
      status: "success",
      message: "successful",
      data: user,
      documentCount: docCount,
      totalPages: Math.ceil(docCount / PAGE_SIZE),
      nextPage: Math.ceil(docCount / PAGE_SIZE) > page ? `/${page + 1}` : null,
    });
  } catch (err) {
    return res.status(500).json({ status: "fail", message: error.mesage });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    return res
      .status(201)
      .json({ status: "success", message: "successful", data: user });
  } catch (err) {
    return res.status(500).json({ status: "fail", message: "server err", err });
  }
};

export const editUserById = async (req, res) => {
  const { id: _id } = req.params;

  // Check if there's at least one information to update
  if (![req.body.name].some(Boolean)) {
    return res.status(400).json({
      status: "Failed",
      message: "All fields cannot be blank to update user",
    });
  }

  try {
    // Update category details in db
    const updatedUser = await User.findByIdAndUpdate({ _id }, req.body, {
      new: true,
    });

    return res.status(200).json({
      status: "Success",
      message: "user updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const savedUser = await User.findByIdAndRemove(id);

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(400).json((error.reason = { message: "id not found" }));
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
