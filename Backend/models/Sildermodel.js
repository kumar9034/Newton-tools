// Sildermodel.js
import db from "../config/Db.js";

class SliderModel {
  static saveMultipleImages(images) {
    return new Promise((resolve, reject) => {
      const values = images.map(img => [img.folder_name, img.image_path]);
      const sql = "INSERT INTO slider_images (folder_name, image_path) VALUES ?";

      db.query(sql, [values], (err, result) => {
        if (err) return reject(err);
        resolve({ insertedIds: result.insertId, images });
      });
    });
  }

  static getAllSliderImages() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM slider_images ORDER BY created_at DESC";
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

   static deleteDocuments(ids, callback) {
  
      const sql = "DELETE FROM documents WHERE id IN (?)";
  
      db.query(sql, [ids], callback);
  
    }
}

export default SliderModel;