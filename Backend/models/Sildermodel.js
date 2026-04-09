// Sildermodel.js
import db from "../config/Db.js";

class SliderModel {
  static saveMultipleImages(images) {
  return new Promise((resolve, reject) => {

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

  // Convert string IDs → number IDs
  const numericIds = ids.map(id => Number(id));

  console.log("Deleting IDs:", numericIds);

  // FINAL WORKING SQL
  const sql = `DELETE FROM slider_images WHERE id IN (${numericIds.join(",")})`;

  db.query(sql, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
}
}

export default SliderModel;