import SliderModel from "../models/Sildermodel.js";

class SliderImage {
  static async postSliderImage(req, res) {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded ❌" });
    }

    const folderName = req.body.name || "slider";

    // ⚠️ Important: title & desc arrays me aayenge from frontend
    const titles = Array.isArray(req.body.title)
      ? req.body.title
      : [req.body.title];

    const descs = Array.isArray(req.body.desc)
      ? req.body.desc
      : [req.body.desc];

    // Map files to DB format
    const images = req.files.map((file, index) => ({
      folder_name: folderName,
      image_path: file.location, // AWS URL
      title: titles[index] || "",
      desc: descs[index] || ""
    }));

    // Save to MySQL
    const savedImages = await SliderModel.saveMultipleImages(images);

    res.status(200).json({
      message: "Slider uploaded successfully ✅",
      savedImages,
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

  // controller/SliderController.js

static deleteslideriamge = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const { id } = req.body;

    // validation
    if (!id || !Array.isArray(id) || id.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No IDs provided"
      });
    }

    SliderModel.deleteDocuments(id, (error, result) => {
      if (error) {
        console.log("DB ERROR:", error);
        return res.status(500).json({
          success: false,
          error: error
        });
      }

      res.json({
        success: true,
        message: "Documents deleted successfully",
        deletedRows: result.affectedRows
      });
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success:false, message:"Server error"});
  }
};
}

export default SliderImage;