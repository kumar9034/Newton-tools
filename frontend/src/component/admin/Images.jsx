import React, { useState } from "react";
import axios from "axios";

const Images = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ name ,setname ] =useState("")

  const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

  // 📁 File Select
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError("");

    if (!selectedFile) return;

    // Only PDF allowed
    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF allowed");
      return;
    }

    // Size check
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("PDF must be less than 15MB");
      return;
    }

    setFile(selectedFile);
  };

  // 🚀 Upload PDF
  const handleUpload = async () => {
    if (!file) {
      setError("Please select PDF");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file); // multer field name same hona chahiye
    formData.append("name", name);

    try {
      setLoading(true);
      console.log(formData);
      const res = await axios.post(
        "/api/promotion",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("PDF Uploaded Successfully ✅");
      setFile(null);
      setname("");
      setError("");

    } catch (err) {
      console.error(err);
      setError("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      {/* Upload Section */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3">Upload PDF</h3>

        <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-yellow-500 transition">
          <p className="text-gray-500 mb-2">
            Click to upload PDF (Max 15MB)
          </p>

          {/* ⭐ INPUT SAME DESIGN — ONLY PDF */}
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {error && (
          <p className="text-red-500 text-sm mt-3">{error}</p>
        )}
      </div>
        <div className="flex flex-col gap-4">
          <h2>Name </h2>
          <input type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder="Enter Owner Name" className="border border-gray-300 rounded px-3 py-2 w-full mb-4" />
        </div>
      {/* Preview Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">PDF Preview</h3>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-yellow-500 px-4 py-2 rounded font-semibold hover:bg-yellow-600 text-white"
          >
            {loading ? "Uploading..." : "Upload PDF"}
          </button>
        </div>

        {file === null ? (
          <p className="text-gray-400 text-sm">
            No PDF selected yet
          </p>
        ) : (
          <div className="flex flex-wrap gap-4">
            <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 w-40">
              <div className="h-24 flex items-center justify-center bg-red-200 rounded text-3xl">
                📄
              </div>

              <p className="text-xs mt-2 truncate font-medium">
                {file.name}
              </p>

              <p className="text-xs text-gray-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Images;