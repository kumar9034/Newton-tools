import React, { useState } from "react";
import axios from "axios";

const SliderUploads = () => {

  const [slides, setSlides] = useState([]);
  const [error, setError] = useState("");

  const MAX_FILE_SIZE = 15 * 1024 * 1024;
  const MAX_FILES = 5;

  // FILE SELECT
  const handleFileChange = (e) => {
    setError("");
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > MAX_FILES) {
      setError("You can upload maximum 5 images");
      return;
    }

    const newSlides = [];

    for (let file of selectedFiles) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError("Each file must be less than 15MB");
        return;
      }

      newSlides.push({
        file,
        title: "",
        desc: ""
      });
    }

    setSlides(newSlides);
  };

  // TITLE DESC CHANGE
  const handleInputChange = (index, field, value) => {
    const updated = [...slides];
    updated[index][field] = value;
    setSlides(updated);
  };

  // UPLOAD
  const handleUpload = async () => {
    if (slides.length === 0) {
      setError("Please select image files first");
      return;
    }

    const formData = new FormData();

    slides.forEach((slide) => {
      formData.append("image", slide.file);
      formData.append("title", slide.title);
      formData.append("desc", slide.desc);
    });

    try {
      const response = await axios.post(
        `/api/slider`,
        formData
      );

      if (response.status === 200) {
        alert("Images uploaded successfully!");
        setSlides([]);
        setError("");
      }
    } catch (err) {
      console.error(err);
      setError("Error uploading images");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      {/* Upload Section (SAME) */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3">Upload Silder-Images (Max 5)</h3>

        <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-yellow-500 transition">
          <p className="text-gray-500 mb-2">
            Click to upload Silder-images (Max 15MB each)
          </p>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>

      {/* Preview Section (UPGRADED) */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Images Preview</h3>

          <button
            onClick={handleUpload}
            className="bg-yellow-500 px-4 py-2 rounded font-semibold hover:bg-yellow-600"
          >
            Upload Slider Images
          </button>
        </div>

        {slides.length === 0 ? (
          <p className="text-gray-400 text-sm">No images selected yet</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-3 bg-gray-50 w-56"
              >
                <div className="h-24 flex items-center justify-center bg-gray-300 rounded text-xs mb-2">
                  📷 Image
                </div>

                <p className="text-xs truncate font-medium mb-2">
                  {slide.file.name}
                </p>

                {/* NEW INPUTS */}
                <input
                  type="text"
                  placeholder="Slider Title"
                  value={slide.title}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                  className="w-full border p-1 text-xs mb-2 rounded"
                />

                <textarea
                  placeholder="Slider Description"
                  value={slide.desc}
                  onChange={(e) =>
                    handleInputChange(index, "desc", e.target.value)
                  }
                  className="w-full border p-1 text-xs rounded"
                />

                <p className="text-xs text-gray-500 mt-1">
                  {(slide.file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderUploads;