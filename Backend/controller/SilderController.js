import SliderModel from "../models/Sildermodel.js";



class SliderImage{
    static async postSilderimage(req, res){
        try {

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: "No images uploaded" });
            }

            const folderName =  "sliderimage";

            // 🔥 Sab files ka full path banao
            const images = req.files.map(file => ({
                folder_name: folderName,
                image_path: `/uploads/${folderName}/${file.filename}`
            }));

            // ✅ Model ko Promise based call karo
            const imagePaths = images.map((image) => image.image_path);
            const result = await SliderModel.saveSliderImage(imagePaths);

            res.json({
                message: "Images uploaded successfully ✅",
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error: error.message
            });
        }
    }

    static async getSliderimage(req, res){
        
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


}
export default SliderImage
