import React, { useState } from "react";
import axios from "axios";

const Images = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
  const MAX_FILES = 10;

  const handleFileChange = (e) => {
    setError("");

    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > MAX_FILES) {
      setError("You can upload maximum 10 images");
      return;
    }

    // Validation
    for (let file of selectedFiles) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError("Each file must be less than 15MB");
        return;
      }
    }

    setFiles(selectedFiles);
    console.log("Selected files:", selectedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select image files first");
      return;
    }

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file); // important
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/documents/upload-images`,
        formData
      );

      if (response.status === 200) {
        alert("Images uploaded successfully!");
        setFiles([]);
        setError("");
      } else {
        setError("Failed to upload images");
      }

    } catch (err) {
      console.error(err);
      setError("Error uploading images");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      {/* Upload Section */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3">Upload Images (Max 10)</h3>

        <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-yellow-500 transition">
          <p className="text-gray-500 mb-2">
            Click to upload images (Max 15MB each)
          </p>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {error && (
          <p className="text-red-500 text-sm mt-3">{error}</p>
        )}
      </div>

      {/* Preview Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Images Preview</h3>

          <button
            onClick={handleUpload}
            className="bg-yellow-500 px-4 py-2 rounded font-semibold hover:bg-yellow-600"
          >
            Upload Images
          </button>
        </div>

        {files.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No images selected yet
          </p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-3 bg-gray-50 w-40"
              >
                <div className="h-24 flex items-center justify-center bg-gray-300 rounded text-xs">
                  📷 Image
                </div>

                <p className="text-xs mt-2 truncate font-medium">
                  {file.name}
                </p>

                <p className="text-xs text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Images;