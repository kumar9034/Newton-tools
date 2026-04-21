import express from "express";
import upload from "../config/multer.js";
import uploadimage from "../config/ImageUpload.js";
import DocumentController from "../controller/userController.js";

const router = express.Router();

router.post("/upload", upload.single("pdf"), DocumentController.DocumentController.upload);
router.post("/upload-images", uploadimage.array("images", 10), DocumentController.ImagesController.uploadImages);

router.get("/latest", DocumentController.PDFgetcontroller.getLatest);
router.get("/allpdf", DocumentController.PDFgetcontroller.getAllDocuments);
router.get("/images", DocumentController.ImagesController.getAllImages)

router.post("/images/delete", DocumentController.ImagesController.deleteImages)
router.post("/deletepdf", DocumentController.PDFgetcontroller.deleteDocuments)


export default router;