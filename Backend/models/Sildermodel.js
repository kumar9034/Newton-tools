import db from "../config/Db.js"


class SliderModel {

  static saveSliderImage(imagePaths) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(imagePaths) || imagePaths.length === 0) {
        return resolve({ affectedRows: 0 });
      }

      const sql = "INSERT INTO sliders (image) VALUES ?";
      const values = imagePaths.map((imagePath) => [imagePath]);

      db.query(sql, [values], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });

    });
  }

  static getAllSliderImages() {
    return new Promise((resolve, reject) => {

      const sql = "SELECT * FROM sliders ORDER BY id DESC";

      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });

    });
  }

}

export default SliderModel;
