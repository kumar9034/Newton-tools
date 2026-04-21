import db from "../config/Db.js"

class Promotionmodel {
    static async uploadDocument(data) {
        const sql = "INSERT INTO promotions (name, pdf) VALUES (?, ?)";
        const [result] = await db.execute(sql, [data.name, data.pdf]);
        return result;
      }


       static async getAllDocuments() {
          const sql = `
            SELECT * FROM promotions
            ORDER BY created_at DESC
          `;
          const [rows] = await db.execute(sql);
          return rows;
        }
      
        // Get Latest PDF
        static async getLatestDocument() {
          const sql = `
            SELECT * FROM promotions
            ORDER BY created_at DESC
            LIMIT 1
          `;
          const [rows] = await db.execute(sql);
          return rows;
        }
      
        // Get Expired PDFs (1 hour old)
        static async getExpiredDocuments() {
          const sql = `
            SELECT * FROM promotions
            WHERE created_at < NOW() - INTERVAL 1 HOUR
          `;
          const [rows] = await db.execute(sql);
          return rows;
        }
}

export default Promotionmodel