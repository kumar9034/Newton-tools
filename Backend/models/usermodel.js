import Db from "../config/Db.js";

class DocumentModel {

  static uploadDocument(data, callback) {
    const sql = "INSERT INTO documents (name, pdf) VALUES (?, ?)";
    Db.query(sql, [data.name, data.pdf], callback);
  }

  static getLatestDocument(callback) {
    const sql = `
      SELECT * FROM documents
      ORDER BY created_at DESC
      LIMIT 1
    `;
    Db.query(sql, callback);
  }

  static getExpiredDocuments(callback) {
    const sql = `
      SELECT * FROM documents
      WHERE created_at < NOW() - INTERVAL 1 HOUR
    `;
    Db.query(sql, callback);
  }

  static deleteExpiredDocuments(ids, callback) {
    const sql = "DELETE FROM documents WHERE id IN (?)";
    Db.query(sql, [ids], callback);
  }

}

export default DocumentModel;