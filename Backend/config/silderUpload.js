import dotenv from "dotenv";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const uploadimage = multer({
  storage: multerS3({
    s3: s3,
    bucket: "newtontools-images-123",
    contentType: multerS3.AUTO_CONTENT_TYPE,

    key: function (req, file, cb) {

      const filename = Date.now() + "-" + file.originalname;

      cb(null, "uploads/" + filename);

    }
  })
});

export default uploadimage;