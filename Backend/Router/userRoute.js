import express from "express";
import upload from "../config/multer.js";
import uploadimage from "../config/ImageUpload.js";
import DocumentController from "../controller/userController.js";

const router = express.Router();

router.post("/upload", upload.single("pdf"), DocumentController.DocumentController.upload);
router.post("/upload-images", uploadimage.array("images", 10), DocumentController.imagescontroller.uploadImages);

router.get("/latest", DocumentController.PDFgetcontroller.getLatest);
router.get("/images", DocumentController.imagescontroller.getAllImages)


export default router;