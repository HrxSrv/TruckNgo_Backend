import  express from "express";
import { getUser,updateUser,getUserById } from "../Handlers/user.js";
const router = express.Router()
router.get("/find/:username",getUser);
router.get("/getUserById",getUserById);
router.put("/updateUser", updateUser);
export default router;