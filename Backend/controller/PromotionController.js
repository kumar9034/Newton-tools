import Promotionmodel from "../models/promotion.js"
import { sendPdfEmail } from "../config/Emailsystem.js"


class PromotionController {
    static async createPromotion(req, res) {
        const { name, email } = req.body


        // 🛑 validation FIRST
        if (!req.file)
            return res.status(400).json({ message: "PDF file missing" });

        if (!name)
            return res.status(400).json({ message: "Name required" });

        const pdf = `${process.env.CDN_URL}/${req.file.key}`;

        await Promotionmodel.uploadDocument({
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

    }


    static async getlatestPromotion(req, res) {
        try {
            const latestPromotion = await Promotionmodel.getLatestDocument();
            res.json({
                success: true,
                user: latestPromotion
            });
        } catch (error) {
            console.error("Error fetching latest promotion:", error);
            res.status(500).json({
                success: false,
                message: "Failed to fetch latest promotion"
            });
        }
    }
}

export default PromotionController;