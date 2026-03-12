import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import {
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
} from "react-icons/fa";
import axios from "axios";

import worker from "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs?url";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = worker;

/* ❄️ Optimized Snow */
const Snow = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}vw`,
            fontSize: `${Math.random() * 6 + 6}px`,
            animationDuration: `${Math.random() * 8 + 6}s`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        >
          🍁
        </span>
      ))}
    </div>
  );
};

const FlyerViewer = () => {
  const bookRef = useRef();
  const [pdfurl, setPdfUrl] = useState();
  const [numPages, setNumPages] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [size, setSize] = useState({ width: 300, height: 500 });

  /* 📐 Responsive Size */
  useEffect(() => {
    const resize = () => {
      const w = window.innerWidth;
      if (w < 640) setSize({ width: 260, height: 360 });
      else if (w < 1024) setSize({ width: 340, height: 440 });
      else setSize({ width: 400, height: 500 });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* 📄 Fetch Latest PDF */
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/documents/latest`
        );
        setPdfUrl(res.data.pdf);
      
      } catch (err) {
        console.error("PDF fetch error:", err);
      }
    };

    fetchPdf();
  }, [setPdfUrl]);

  const nextPage = () => bookRef.current?.pageFlip().flipNext();
  const prevPage = () => bookRef.current?.pageFlip().flipPrev();

  const downloadFlyer = () => {
    if (!pdfurl) return alert("PDF not available");
    const link = document.createElement("a");
    link.href = pdfurl;
    link.setAttribute("download", pdfurl.split("/").pop());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative md:h-[100vh] h-auto py-36 flex items-center justify-center overflow-hidden bg-gray-100">

      <Snow />

      <div className="relative z-10 flex flex-col items-center w-full">

        {/* HEADER */}
        <div className="flex justify-between items-center w-full max-w-5xl px-8 ">
          <h1 className="text-xl font-bold">Flyer Sale</h1>
          <button
            onClick={downloadFlyer}
            className="text-black opacity-80 hover:opacity-100"
          >
            <FaDownload size={18} />
          </button>
        </div>

        {/* PDF VIEWER */}
        {pdfurl ? (
          <div className="flex items-center gap-3">

            <button
              onClick={prevPage}
              disabled={zoom > 1}
              className="text-yellow-500 text-3xl opacity-70 hover:opacity-100"
            >
              <FaChevronLeft />
            </button>

            <div className="rounded-lg shadow-2xl bg-white sm:w-[25vw] w-[70vw] h-[77vh] overflow-hidden px-5">
              <Document
                file={{
                  url: pdfurl
                }}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                loading={<p>Loading PDF...</p>}
              >
                {numPages && (
                  <HTMLFlipBook
                    ref={bookRef}
                    width={size.width}
                    height={size.height}
                    showCover
                    drawShadow
                    flippingTime={800}
                    disableFlipByClick={zoom > 1}
                  >
                    {Array.from({ length: numPages }, (_, index) => (
                      <div
                        key={index}
                        className="flex justify-center items-center bg-white"
                      >
                        <Page
                          pageNumber={index + 1}
                          width={size.width}
                          scale={zoom}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                      </div>
                    ))}
                  </HTMLFlipBook>
                )}
              </Document>
            </div>

            <button
              onClick={nextPage}
              disabled={zoom > 1}
              className="text-yellow-500 text-3xl opacity-70 hover:opacity-100"
            >
              <FaChevronRight />
            </button>

          </div>
        ) : (
          <p className="text-gray-600">Loading flyer...</p>
        )}

        {/* ZOOM */}
        <div className="mt-6 w-64 mb-5">
          <input
            type="range"
            min="1"
            max="2"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-full cursor-pointer"
          />
          <p className="text-xs text-center mt-1">{zoom.toFixed(1)}x</p>
        </div>

      </div>
    </div>
  );
};

export default FlyerViewer;

