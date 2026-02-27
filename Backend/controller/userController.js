import DocumentModel from "../models/usermodel.js";
import ImageModel from "../models/imageModel.js";
import path from "path"

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class DocumentController {

    static upload(req, res) {
        const { name } = req.body;
        const pdf = req.file?.filename;

        if (!pdf) {
            return res.status(400).json({ message: "PDF is required ❌" });
        }
        const filepath = `/uploads/${pdf}`

        DocumentModel.uploadDocument({ name, pdf: filepath }, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(200).json({ message: "PDF uploaded successfully ✅" });
        });
    }



}

class PDFgetcontroller {

   static async getLatest(req, res) {
    DocumentModel.getLatestDocument((err, result) => {

        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!result || result.length === 0) {
            return res.status(404).json({ error: "No document found" });
        }

        const document = result[0];

        return res.json({
            id: document.id,
            pdf: document.pdf, // yaha se pdf milega
            created_at: document.created_at
        });

    });
}

}

class imagescontroller {

    static async uploadImages(req, res) {

        try {

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: "No images uploaded" });
            }

            const folderName = req.body.name || "images";

            // 🔥 Sab files ka full path banao
            const images = req.files.map(file => ({
                folder_name: folderName,
                image_path: `/uploads/${folderName}/${file.filename}`
            }));

            // ✅ Model ko Promise based call karo
            const result = await ImageModel.saveMultipleImages(images);

            res.json({
                message: "Images uploaded successfully ✅",
                images,
                dbResult: result
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error: error.message
            });
        }
    }


    static async getAllImages(req, res) {

        try {

            const images = await ImageModel.getAllImages();

            if (images.length === 0) {
                return res.status(404).json({ message: "No images found" });
            }

            res.json({
                success: true,
                total: images.length,
                images
            });

        } catch (error) {

            res.status(500).json({
                error: error.message
            });

        }


    }
}



export default { DocumentController, PDFgetcontroller, imagescontroller };