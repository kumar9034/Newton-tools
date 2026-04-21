import db from "../config/db.js";

class ImageModel {

  // Save multiple images
  static async saveMultipleImages(images) {
    const values = images.map(img => [img.image_path]);

    const sql = `
      INSERT INTO images (folder_path)
      VALUES ?
    `;

    const [result] = await db.query(sql, [values]);
    return result;
  }

  // Get all images
  static async getAllImages() {
    const sql = "SELECT * FROM images ORDER BY id DESC";
    const [rows] = await db.execute(sql);
    return rows;
  }

  // Delete images
  static async deleteImages(ids) {
    const sql = "DELETE FROM images WHERE id IN (?)";
    const [result] = await db.query(sql, [ids]);
    return result;
  }

}

export default ImageModel;