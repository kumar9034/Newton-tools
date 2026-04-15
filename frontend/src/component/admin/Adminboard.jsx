import React, { useState, useEffect } from "react";
import axios from "axios";
import Images from "./Images";
import SliderUploads from "./SliderUploads";

const Adminboard = () => {

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Dashboard");

  const [pdfs, setPdfs] = useState([]);
  const [images, setImages] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);

  const [selectedPdfs, setSelectedPdfs] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedSliders, setSelectedSliders] = useState([]);

  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  // FILE CHANGE
  const handleFileChange = (e) => {
    setError("");

    const selected = e.target.files[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      setError("Only PDF files allowed");
      return;
    }

    if (selected.size > MAX_FILE_SIZE) {
      setError("File must be less than 50MB");
      return;
    }

    setFile(selected);
  };

  // SELECT CHECKBOX
  const toggleSelect = (id, selected, setSelected) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  // PDF UPLOAD
  const handleupload = async () => {

    if (!file) {
      setError("Please select PDF");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {

      const res = await axios.post(
        `/api/documents/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log(res.data)

      if (res.status === 200) {
        alert("PDF Uploaded");
        setFile(null);
        fetchPdfs();
      }

    } catch (err) {
      setError("Upload failed");
    }

  };

  // FETCH PDF
  const fetchPdfs = async () => {
    try {
      const res = await axios.get(`/api/documents/allpdf`);

      if (Array.isArray(res.data)) {
        setPdfs(res.data);
      } else {
        setPdfs([]);
      }

    } catch (err) {
      console.log(err);
    }
  };

  // FETCH IMAGES
  const fetchImages = async () => {
    try {

      const res = await axios.get(`/api/documents/images`);

      if (Array.isArray(res.data.images)) {
        setImages(res.data.images);
      } else {
        setImages([]);
      }

    } catch (err) {
      console.log(err);
    }
  };

  // FETCH SLIDER
  const fetchSlider = async () => {

    try {

      const res = await axios.get(`/api/allimageslider`);

      console.log("slider response:", res.data.data);

      if (Array.isArray(res.data)) {
        setSliderImages(res.data.data);
      } else if (Array.isArray(res.data.data)) {
        setSliderImages(res.data.data);
      }
      console.log()
    } catch (err) {
      console.log(err);
    }
    console.log(selectedImages)
  };

  useEffect(() => {
    fetchPdfs();
    fetchImages();
    fetchSlider();
  }, []);

  // DELETE PDF
  const deletePdfs = async () => {

    if (selectedPdfs.length === 0) {
      alert("Select PDF first");
      return;
    }

    await axios.post(
      `/api/documents/deletepdf`,
      { id: selectedPdfs }
    );

    setPdfs(pdfs.filter(pdf => !selectedPdfs.includes(pdf.id)));
    setSelectedPdfs([]);

  };

  // DELETE IMAGE
  const deleteImages = async () => {

    if (selectedImages.length === 0) {
      alert("Select image first");
      return;
    }

    await axios.post(
      `/api/documents/images/delete`,
      { id : selectedImages }
    );

    setImages(images.filter(img => !selectedImages.includes(img.id)));
    setSelectedImages([]);

  };

  // DELETE SLIDER
  const deleteSliders = async () => {

    if (selectedSliders.length === 0) {
      alert("Select slider image first");
      return;
    }

    const res = await axios.post(
      `/api/deleteimageslider`,
      {
        id: selectedSliders   // ⭐ direct bhejo
      }
    );
    console.log(res.data)
    setSliderImages(
      sliderImages.filter(img => !selectedSliders.includes(img.id))
    );

    setSelectedSliders([]);

  };

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}

      <aside className="w-64 bg-gray-900 text-white p-6">

        <h1 className="text-2xl font-bold text-yellow-400 mb-8">
          Admin Panel
        </h1>

        <ul className="space-y-4">

          <li onClick={() => setActiveTab("Dashboard")} className="cursor-pointer">
            Dashboard
          </li>

          <li onClick={() => setActiveTab("Uploads")} className="cursor-pointer">
            Flyer Upload
          </li>

          <li onClick={() => setActiveTab("images-upload")} className="cursor-pointer">
            Fastener
          </li>

          <li onClick={() => setActiveTab("Slider-uploads")} className="cursor-pointer">
            Slider Upload
          </li>

        </ul>

      </aside>

      {/* MAIN */}

      <main className="flex-1 p-8">

        <h2 className="text-2xl font-bold mb-6">Media Manager</h2>

        {activeTab === "Dashboard" && (

          <div className="bg-white p-6 rounded shadow">

            {/* PDF */}

            <h3 className="font-semibold mb-3">PDF Files</h3>

            {Array.isArray(pdfs) && pdfs.map(pdf => (

              <div key={pdf.id} className="flex items-center gap-2 mb-2">

                <input
                  type="checkbox"
                  checked={selectedPdfs.includes(pdf.id)}
                  onChange={() =>
                    toggleSelect(pdf.id, selectedPdfs, setSelectedPdfs)
                  }
                />
                <div className=" w-full flex justify-between ">
                  <span>{pdf.pdf}</span>
                  <span>{new Date(pdf.created_at).toLocaleDateString()}</span>
                </div>

              </div>

            ))}

            <button
              className="bg-red-500 text-white px-3 py-1 rounded mt-2 active:scale-95"
              onClick={deletePdfs}
            >
              Delete Selected
            </button>

            {/* IMAGES */}

            <h3 className="font-semibold mt-6 mb-3">Images</h3>

            <div className="flex flex-col gap-2">

              {Array.isArray(images) && images.map(img => (

                <div key={img.id} className="">
                  <div className=" flex flex-wrap  justify-between w-full ">

                    <input
                      type="checkbox"
                      // className="absolute top-2 left-2"
                      checked={selectedImages.includes(img.id)}
                      onChange={() =>
                        toggleSelect(img.id, selectedImages, setSelectedImages)
                      }
                    />
                    <div className="w-[97%] flex  gap-5 ">
                      <span className="line-clamp-[1] ">{img.folder_path}</span>
                      <span>{new Date(img.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                </div>

              ))}

            </div>

            <button
              className="bg-red-500 text-white px-3 py-1 rounded mt-2 active:scale-95"
              onClick={deleteImages}
            >
              Delete Selected
            </button>

            {/* SLIDER */}

            <h3 className="font-semibold mt-6 mb-3">Slider Images</h3>

            {Array.isArray(sliderImages) && sliderImages.map(img => (

              <div key={img.id} className="flex w-full justify-between gap-2 mb-2">

                <input
                  type="checkbox"
                  checked={selectedSliders.includes(img.id)}
                  onChange={() =>
                    toggleSelect(img.id, selectedSliders, setSelectedSliders)
                  }
                />
                <span className="line-clamp-[1] w-[95%]">{img.image_path}</span>
                <span>{new Date(img.created_at).toLocaleDateString()}</span>

              </div>

            ))}

            <button
              className="bg-red-500 text-white px-3 py-1 rounded mt-2 active:scale-95"
              onClick={deleteSliders}
            >
              Delete Selected
            </button>

          </div>

        )}

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

        {activeTab === "images-upload" && <Images />}
        {activeTab === "Slider-uploads" && <SliderUploads />}

      </main>

    </div>

  );

};

export default Adminboard;