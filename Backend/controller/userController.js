import DocumentModel from "../models/usermodel.js";
import ImageModel from "../models/imageModel.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { sendPdfEmail } from "../config/Emailsystem.js";

class DocumentController {

  static upload = AsyncHandler(async (req, res) => {

  const { name, email } = req.body;

  // 🛑 validation FIRST
  if (!req.file)
    return res.status(400).json({ message: "PDF file missing" });

  if (!name)
    return res.status(400).json({ message: "Name required" });

  const pdf = `${process.env.CDN_URL}/${req.file.key}`;

  await DocumentModel.uploadDocument({
    name: name ?? null,
    pdf: pdf ?? null
  });

  // email background
  sendPdfEmail(email, name, pdf)
    .catch(err => console.error("Email error:", err));

  res.json({
    success: true,
    message: "PDF uploaded successfully",
    url: pdf
  });

});
}

class PDFgetcontroller {

  static getLatest = AsyncHandler(async (req, res) => {
    const result = await DocumentModel.getLatestDocument();
    if (!result.length)
      return res.status(404).json({ message: "No document found" });

    res.json(result[0]);
  });

  static getAllDocuments = AsyncHandler(async (req, res) => {
    const docs = await DocumentModel.getAllDocuments();
    res.json(docs);
  });

  static deleteDocuments = AsyncHandler(async (req, res) => {
    const { id } = req.body;
    const result = await DocumentModel.deleteDocuments(id);
    res.json({ success: true, deleted: result.affectedRows });
  });
}

class ImagesController {

  static uploadImages = AsyncHandler(async (req, res) => {
    const folderName = req.body.name || "images";

    const images = req.files.map(file => ({
      folder_name: folderName,
      image_path: file.location
    }));

    await ImageModel.saveMultipleImages(images);

    res.json({ success: true, images });
  });

  static getAllImages = AsyncHandler(async (req, res) => {
    const images = await ImageModel.getAllImages();
    res.json(images);
  });

  static deleteImages = AsyncHandler(async (req, res) => {
    const { id } = req.body;
    const result = await ImageModel.deleteImages(id);
    res.json({ success: true, deleted: result.affectedRows });
  });
}

export default { DocumentController, PDFgetcontroller, ImagesController };