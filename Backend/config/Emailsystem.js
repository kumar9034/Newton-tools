import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { appendFile } from "fs";
dotenv.config();


const transporter = nodemailer.createTransport({
  host: "email-smtp.ca-central-1.amazonaws.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SES_USER,
    pass: process.env.SES_PASS,
  },
});

// console.log(process.env.EMAIL_HOST);
// console.log(process.env.EMAIL_PORT);
// console.log(process.env.EMAIL_USER);
// console.log(process.env.EMAIL_PASS);

export const sendPdfEmail = async (email, name, pdfUrl) => {
  await transporter.sendMail({
    from: `"Newton Tools" <${process.env.EMAIL_USER}>`,
    to: "kumarrajput040202003@gmail.com", // 👈 FIXED RECEIVER
    subject: "New PDF Uploaded 📄",
   html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>

<body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellspacing="0" cellpadding="0" style="padding:30px 0;">
    <tr>
      <td align="center">

        <table width="600" cellspacing="0" cellpadding="0" 
          style="background:#ffffff; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.1); overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#0f172a; padding:20px; text-align:center;">
              <h1 style="color:#ffffff; margin:0;">Newton Tools</h1>
              <p style="color:#cbd5e1; margin:5px 0 0;">Document Delivery Service</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;">
              <h2 style="color:#111827; margin-top:0;">📄 Your Document is Ready</h2>

              <p style="color:#374151; font-size:15px;">
                Hello <b>${name}</b>,
              </p>

              <p style="color:#374151; font-size:15px; line-height:1.6;">
                Your PDF has been successfully uploaded and is ready for download.
                Click the button below to access your document securely.
              </p>

              <div style="text-align:center; margin:35px 0;">
                <a href="${pdfUrl}" 
                   style="background:#2563eb; color:#ffffff; padding:14px 28px; 
                          text-decoration:none; border-radius:6px; font-weight:bold; 
                          display:inline-block;">
                   Download PDF
                </a>
              </div>

              <p style="color:#6b7280; font-size:13px;">
                If the button doesn’t work, copy and paste this link into your browser:
              </p>
              <p style="color:#2563eb; font-size:13px; word-break:break-all;">
                ${pdfUrl}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f1f5f9; padding:20px; text-align:center;">
              <p style="margin:0; color:#64748b; font-size:12px;">
                © ${new Date().getFullYear()} Newton Tools. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`,
  })
}