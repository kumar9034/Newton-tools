import dotenv from "dotenv"
import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import path from "path";

dotenv.config();


// AWS config
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,     // Your AWS access key
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Your AWS secret
  region: process.env.AWS_REGION                 // Example: "ap-south-1"
});


// Multer S3 storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,  // Your S3 bucket name
    acl: "public-read",                   // Optional: file permissions
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