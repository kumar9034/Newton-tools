// SliderModel.js
import db from "../config/db.js";

class SliderModel {

  // SAVE MULTIPLE IMAGES
  static async saveMultipleImages(images) {
    try {
      const values = images.map(img => [
        img.folder_name,
        img.image_path,
        img.title,
        img.desc
      ]);

      const sql = `
        INSERT INTO slider_images 
        (folder_name, image_path, title, \`desc\`) 
        VALUES ?
      `;

      const [result] = await db.query(sql, [values]);

      return { insertedIds: result.insertId, images };

    } catch (error) {
      throw error;
    }
  }

  // GET ALL SLIDERS
  static async getAllSliderImages() {
    try {
      const sql = "SELECT * FROM slider_images ORDER BY created_at DESC";
      const [rows] = await db.query(sql);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // DELETE MULTIPLE
  static async deleteDocuments(ids) {
    try {
      const numericIds = ids.map(id => Number(id));
      const sql = `DELETE FROM slider_images WHERE id IN (${numericIds.join(",")})`;
      const [result] = await db.query(sql);
      return result;
    } catch (error) {
      throw error;
    }
  }

}

export default SliderModel;