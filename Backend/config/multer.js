import dotenv from "dotenv"
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import path from "path";

dotenv.config();


// AWS config
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});


// Multer S3 storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "newtontools-images-123",  // Your S3 bucket name   
    contentType: multerS3.AUTO_CONTENT_TYPE,                
    key: (req, file, cb) => {
      const filename = Date.now() + path.extname(file.originalname);
      cb(null, filename);                 // File path in S3
    }
  }),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed ❌"));
  }
});

export default upload;