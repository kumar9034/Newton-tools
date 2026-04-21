import db from "../config/db.js";

class DocumentModel {

  // Upload PDF
  static async uploadDocument(data) {
    const sql = "INSERT INTO documents (name, pdf) VALUES (?, ?)";
    const [result] = await db.execute(sql, [data.name, data.pdf]);
    return result;
  }

  // Get ALL PDFs
  static async getAllDocuments() {
    const sql = `
      SELECT * FROM documents
      ORDER BY created_at DESC
    `;
    const [rows] = await db.execute(sql);
    return rows;
  }

  // Get Latest PDF
  static async getLatestDocument() {
    const sql = `
      SELECT * FROM documents
      ORDER BY created_at DESC
      LIMIT 1
    `;
    const [rows] = await db.execute(sql);
    return rows;
  }

  // Get Expired PDFs (1 hour old)
  static async getExpiredDocuments() {
    const sql = `
      SELECT * FROM documents
      WHERE created_at < NOW() - INTERVAL 1 HOUR
    `;
    const [rows] = await db.execute(sql);
    return rows;
  }

  // Delete Expired PDFs
  static async deleteExpiredDocuments(ids) {
    const sql = "DELETE FROM documents WHERE id IN (?)";
    const [result] = await db.query(sql, [ids]);
    return result;
  }

  // Delete selected PDFs
  static async deleteDocuments(ids) {
    const sql = "DELETE FROM documents WHERE id IN (?)";
    const [result] = await db.query(sql, [ids]);
    return result;
  }

}

export default DocumentModel;