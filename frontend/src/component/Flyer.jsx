import { useEffect, useRef, useState } from "react";
import { Document, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, Maximize2 } from "lucide-react";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const FlyerViewer = () => {

  const bookRef = useRef();

  const [pdfurl, setPdfUrl] = useState(null);
  const [pageImages, setPageImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState({ width: 340, height: 480 });

  // ⭐ UNIVERSAL ZOOM STATES
  const [isZoomed, setIsZoomed] = useState(false);
  const [pointerPos, setPointerPos] = useState({ x: 50, y: 50 });
  const lastTapRef = useRef(0);

  /* ---------------- SCREEN SIZE ---------------- */
  useEffect(() => {
    const updateSize = () => {
      const vw = window.innerWidth;
      let pageWidth;
      let pageHeight;

      if (vw < 600) {
        pageWidth = vw * 0.98;
        pageHeight = pageWidth * 1.4;
      } 
      else if (vw < 1100) {
        pageWidth = vw * 0.9;
        pageHeight = pageWidth * 1.3;
      } 
      else {
        pageWidth = 550;
        pageHeight = pageWidth * 1.414;
      }

      setSize({ width: pageWidth, height: pageHeight });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  /* ---------------- PDF → IMAGES ---------------- */
  const convertPagesToImages = async (pdf) => {
    setLoading(true);
    const images = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2.5 });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;
      images.push(canvas.toDataURL("image/jpeg", 0.95));
    }

    setPageImages(images);
    setLoading(false);
  };

  /* ---------------- FETCH PDF ---------------- */
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/documents/latest`);
        setPdfUrl(res.data.pdf);
      } catch (err) { console.error(err); }
    };
    fetchPdf();
  }, []);

  /* ---------------- POINTER SYSTEM (MOUSE + TOUCH) ---------------- */

  const updatePointerPosition = (clientX, clientY, element) => {
    const rect = element.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setPointerPos({ x, y });
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    updatePointerPosition(e.clientX, e.clientY, e.currentTarget);
  };

  // 📱 DOUBLE TAP ZOOM
  const handleTouchStart = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      setIsZoomed(prev => !prev);
    }
    lastTapRef.current = now;
  };

  // 📱 DRAG TO PAN
  const handleTouchMove = (e) => {
    if (!isZoomed) return;
    const touch = e.touches[0];
    updatePointerPosition(touch.clientX, touch.clientY, e.currentTarget);
  };

  return (
    <div className="h-auto bg-[#050505] text-white flex flex-col items-center p-4 md:p-8 overflow-hidden">

      {/* HEADER */}
      <header className="w-full max-w-5xl mb-6 flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isZoomed ? 'bg-yellow-400 text-black' : 'bg-white/5'}`}>
            <Maximize2 size={18} />
          </div>
          <h1 className="text-sm font-bold tracking-[0.2em] uppercase italic">Flyer</h1>
        </div>
      </header>

      <main className="relative flex-1 flex items-center justify-center w-full">
        <div className="relative group p-4">

          {loading && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-yellow-400" size={32} />
              <p className="text-[10px] tracking-widest text-gray-500 uppercase">Rendering...</p>
            </div>
          )}

          {pdfurl && <Document file={pdfurl} onLoadSuccess={convertPagesToImages} className="hidden" />}

          {!isZoomed && !loading && (
            <button onClick={() => bookRef.current.pageFlip().flipPrev()}
              className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white text-black">
              <ChevronLeft size={24} strokeWidth={3} />
            </button>
          )}

          {pageImages.length > 0 && (
            <HTMLFlipBook
              width={size.width}
              height={size.height}
              showCover
              ref={bookRef}
              useMouseEvents={false}
              mobileScrollSupport
              className="mx-auto">

              {pageImages.map((img, i) => (
                <div key={i}
                  className="bg-white relative overflow-hidden"
                  onDoubleClick={() => setIsZoomed(!isZoomed)}
                  onMouseMove={handleMouseMove}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                >
                  <motion.img
                    src={img}
                    alt="page"
                    className="w-full h-full object-cover"
                    animate={{
                      scale: isZoomed ? 2.5 : 1,
                      x: isZoomed ? `${(50 - pointerPos.x) * 0.4}%` : 0,
                      y: isZoomed ? `${(50 - pointerPos.y) * 0.4}%` : 0
                    }}
                    style={{ transformOrigin: `${pointerPos.x}% ${pointerPos.y}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              ))}

            </HTMLFlipBook>
          )}

          {!isZoomed && !loading && (
            <button onClick={() => bookRef.current.pageFlip().flipNext()}
              className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white text-black">
              <ChevronRight size={24} strokeWidth={3} />
            </button>
          )}

        </div>
      </main>

      <footer className="mt-auto py-6 text-white/20 text-[10px] tracking-[0.8em] uppercase">
        Newton-tool Flyer
      </footer>
    </div>
  );
};

export default FlyerViewer;