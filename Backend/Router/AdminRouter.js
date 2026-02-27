import express from "express"
import { AdminController } from "../controller/AdminController.js"

const router = express.Router()

router.post("/signup", AdminController.postSignup)
router.post("/login", AdminController.postLogin)

export default router
