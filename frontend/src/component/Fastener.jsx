import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const Fastener = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/documents/images`
        );
          console.log("Fetched images:", res.data.images);
        if (res.data.images) {
          const fullUrls = res.data.images.map(
            (img) => `${import.meta.env.VITE_API_URL}${img.folder_path}`
          );

          setImages(fullUrls);
          console.log(images)
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />

      <div className="w-full min-h-auto px-30 py-35">
      

          {images.length > 0 ? (
            images.map((img, index) => (
              <div
                key={index}
                className="w-full h-auto "
              >
                <img
                  src={img}
                  alt={`Fastener ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-lg mt-10 font-semibold">
              No images found 📂
            </p>
          )}
      </div>

      <Footer />
    </div>
  );
};

export default Fastener;