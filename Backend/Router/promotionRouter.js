import upload from "../config/multer.js"
import PromotionController from "../controller/PromotionController.js"
import express from "express"

const router = express.Router()

router.post("/promotion", upload.single("pdf"), PromotionController.createPromotion)
router.get("/latest-promotion", PromotionController.getlatestPromotion)

export default router