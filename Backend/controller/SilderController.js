import SliderModel from "../models/Sildermodel.js";

class SliderImage {
  static async postSliderImage(req, res) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No images uploaded ❌" });
      }

      const folderName = req.body.name || "slider";

      // Map files to DB format
      const images = req.files.map(file => ({
        folder_name: folderName,
        image_path: file.location, // <-- AWS URL
      }));

      // ✅ Save to MySQL using your model
      const savedImages = await SliderModel.saveMultipleImages(images);

      res.status(200).json({
        message: "Images uploaded successfully ✅",
        savedImages, // contains AWS URLs + DB IDs
      });

    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: error.message || "Internal server error ❌" });
    }
  }

  static async getSliderimage(req, res) {
    try {
      const sliders = await SliderModel.getAllSliderImages();

      res.status(200).json({
        success: true,
        data: sliders
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

    static deleteslideriamge = async (req, res) => {

  const { id } = req.body;

  if (!id || id.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No IDs provided"
    });
  }

  SliderModel.deleteDocuments(id, (error, result) => {

    if (error) {
      return res.status(500).json({
        success: false,
        error: error
      });
    }

    res.json({
      success: true,
      message: "Documents deleted successfully",
      deleted: result.affectedRows
    });

  });

};
}

export default SliderImage;