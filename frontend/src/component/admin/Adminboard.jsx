import React, { useState } from "react";
import axios from "axios"
import { useEffect } from "react";
import Images from "./Images";
import SliderUploads from "./SliderUploads";

const Adminboard = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Dashboard");
  const token = localStorage.getItem("token");

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  if (!token) {
    return  window.location.href = "/admin/login";;
  }

  const handleFileChange = (e) => {
    setError("");
    const selected = e.target.files[0];

    if (!selected) return;

    if (selected.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    if (selected.size > MAX_FILE_SIZE) {
      setError("File size must be less than 50MB");
      return;
    }
    setFile(selected);

    console.log("Selected file:", selected);
  };

  const handleupload = async () => {
    if (!file) {
      setError("Please select a PDF file first");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/documents/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload response:", response.data);

      if (response.status === 200) {
        alert("PDF uploaded successfully!");
        setFile(null);
        setError("");
      } else {
        setError("Failed to upload PDF");
      }
    } catch (err) {
      setError("Error uploading PDF");
    }
  };

  useEffect(() => {
    const datafatch = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/documents/latest`)
      console.log("Latest document:", res.data);
    }

    datafatch()
  }, [axios])


  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 ">
        <h1 className="text-2xl font-bold text-yellow-400 mb-8">
          <img src="/logo.svg" alt="" />
        </h1>

        <ul className="space-y-4 text-gray-300">
          <li onClick={() => setActiveTab("Dashboard")} className="hover:text-yellow-400 cursor-pointer">Dashboard</li>
          <li onClick={() => setActiveTab("Uploads")} className="hover:text-yellow-400 cursor-pointer">Flyer Upload</li>
          <li onClick={() => setActiveTab("images-upload")} className="hover:text-yellow-400 cursor-pointer">Fastener</li>
          <li onClick={() => setActiveTab("Slider-uploads")} className="hover:text-yellow-400 cursor-pointer">Slider upload</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 h-screen overflow-hiden ">

        {/* Header */}
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Upload Dashboard</h2>
          <button onClick={()=> {
            localStorage.removeItem("token");
            window.location.href = "/admin/login";
          }} className="bg-yellow-500 px-4 py-2 rounded font-semibold hover:bg-yellow-600 active:scale-95 transition">
            Logout
          </button>
        </div>

        {/* Upload Card */}
        {
          activeTab === "Uploads" && (
            <>
              <div className="bg-white rounded-xl shadow p-6 mb-8">
                <h3 className="font-semibold mb-3">Upload PDF</h3>

                <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-yellow-500 transition">
                  <p className="text-gray-500 mb-2">Click to upload PDF (Max 50MB)</p>
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

              {/* Uploaded Files Preview */}
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">PDF Preview</h3>
                  <button onClick={handleupload} className="bg-yellow-500 px-4 py-2 rounded font-semibold hover:bg-yellow-600">
                    Upload PDF
                  </button>
                </div>

                {!file && (
                  <p className="text-gray-400 text-sm">No PDF uploaded yet</p>
                )}

                {file && (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 max-w-sm">
                    <div className="h-40 flex items-center justify-center bg-gray-300 rounded text-gray-700 text-sm font-semibold">
                      📄 PDF File
                    </div>
                    <p className="text-sm mt-3 truncate font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
            </>
          )
        }

        {activeTab === "Dashboard" && (
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-3">Dashboard Overview</h3>
            <p className="text-gray-600">Welcome to the admin dashboard!</p>
          </div>
        )}
        {activeTab === "images-upload" && (
          <Images/>
        )}
        {activeTab === "Slider-uploads" && (
          <SliderUploads/>
        )}

      </main>
    </div>
  );
};

export default Adminboard;
