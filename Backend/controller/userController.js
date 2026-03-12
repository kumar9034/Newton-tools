import DocumentModel from "../models/usermodel.js";
import ImageModel from "../models/imageModel.js";
import path from "path"

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class DocumentController {

    static upload(req, res) {
        const { name } = req.body;

        const pdf = req.file?.location;   // S3 file URL

        if (!pdf) {
            return res.status(400).json({ message: "PDF is required ❌" });
        }

        DocumentModel.uploadDocument({ name, pdf }, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            res.status(200).json({
                message: "PDF uploaded successfully ✅",
                url: pdf
            });
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

    static getAllDocuments = async (req, res) => {

        DocumentModel.getAllDocuments((err, result) => {

            if (err) {
                return res.status(500).json({ error: err });
            }

            res.json(result);

        });

    };


   static deleteDocuments = async (req, res) => {

  const { id } = req.body;

  if (!id || id.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No IDs provided"
    });
  }

  DocumentModel.deleteDocuments(id, (error, result) => {

    if (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }

    res.json({
      success: true,
      message: "Documents deleted successfully",
      deleted: result.affectedRows
    });

  });

};

}

class imagescontroller {

    static async uploadImages(req, res) {

        try {

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: "No images uploaded" });
            }

            const folderName = req.body.name || "images";

            const images = req.files.map(file => {

                console.log(file.key);
                console.log(file.location);

                return {
                    folder_name: folderName,
                    image_path: file.location
                };

            });

            const result = await ImageModel.saveMultipleImages(images);

            res.json({
                message: "Images uploaded successfully ✅",
                images
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