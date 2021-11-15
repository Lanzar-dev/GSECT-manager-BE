import express from "express";
import { isAuth } from "../middleware/auth.js";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
  getUsers,
  getUserById,
  editUserById,
  deleteUser

} from "../controllers/UserControllers.js";

const router = express.Router();

router.route("/getUsers").get(isAuth, getUsers);

router.route("/getUser/:id").get(isAuth, getUserById);

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotPassword);

router.route("/resetpassword/:resetToken").put(resetPassword);

router.route("/editUser/:id").put(isAuth, editUserById)

router.route("/deleteUser/:id").delete(isAuth, deleteUser)

export default router;
