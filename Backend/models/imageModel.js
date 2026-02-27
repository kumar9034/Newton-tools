import db from "../config/Db.js";

class ImageModel {

  static saveMultipleImages(images) {

    return new Promise((resolve, reject) => {

      const values = images.map(img => [
        img.image_path
      ]);

      const sql = `
        INSERT INTO images ( folder_path)
        VALUES ?
      `;

      db.query(sql, [values], (err, result) => {

        if (err) return reject(err);

        resolve(result);

      });

    });
  }

  static getAllImages() {
  return new Promise((resolve, reject) => {

    const sql = "SELECT * FROM images";

    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });

  });
}

}

export default ImageModel;