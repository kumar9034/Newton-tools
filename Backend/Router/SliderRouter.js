import express from "express"
import SilderUpload from "../config/silderUpload.js"
import SliderImage from "../controller/SilderController.js"

const router = express.Router()

router.post("/Slider",  SilderUpload.array("image", 5) , SliderImage.postSilderimage)
router.get("/allimageslider", SliderImage.getSliderimage)

export default router
