import express from "express";
import { privateInfo } from "../controllers/private.js";
import { isAuth } from "../middleware/auth.js";
const router = express.Router();

//Only to be accessed by authorized users
router.route("/").get(isAuth, privateInfo);

export default router;
