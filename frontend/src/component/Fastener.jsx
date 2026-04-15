import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const Fastener = () => {

  const images = [
    {
    title : "Coil Nails",
    images : "Screenshot 2026-04-14 152321.png",
  },
    {
    title : "Stick Nails",
    images : "Screenshot 2026-04-14 152341.png",
  },
    {
    title : "Bulk Nails",
    images : "Screenshot 2026-04-14 152356.png",
  },
    {
    title : "Screws",
    images : "Screenshot 2026-04-14 152411.png",
  },
    {
    title : "Staples",
    images : "Screenshot 2026-04-14 152427.png",
  },
    {
    title : "Finishing Nails",
    images : "Screenshot 2026-04-14 152443.png",
  },
    {
    title : "Steel Strap",
    images : "Screenshot 2026-04-14 152500.png",
  },
    {
    title : "Anchors ",
    images : "Screenshot 2026-04-14 152542.png",
  }
  ]


  return (
    <div>
      <Header />

      <div className="w-full min-h-auto flex flex-wrap gap-5 md:px-10 px-3 pt-31 pb-10">

       

          {images.length > 0 ? (
            images.map((img, index) => (
              <div
                key={index}
                className="md:w-[30%] w-[45%] h-auto flex flex-col items-center gap-3  rounded-lg p-4 shadow-md"
              >
                <img
                  src={img.images}
                  alt={`Fastener ${index + 1}`}
                  className="w-full h-auto object-contain"
                />
              <h2 className="text-lg font-[700] ">{img.title}</h2>
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