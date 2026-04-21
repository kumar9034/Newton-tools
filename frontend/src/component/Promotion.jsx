import React from 'react'
import Header from './Header'
import Footer from './Footer'
import FlyerViewer from './Flyer'
import { useEffect, useRef, useState, useCallback } from "react";
import { Document, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronLeft, ChevronRight, Loader2, Maximize2, Minimize2 } from "lucide-react";
import axios from "axios";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;


const Promotion = () => {
  const bookRef = useRef();
   const [pdfurl, setPdfUrl] = useState(null);
   const [pageImages, setPageImages] = useState([]);
   const [loading, setLoading] = useState(true);
   const [size, setSize] = useState({ width: 340, height: 480 });
   
   const [isZoomed, setIsZoomed] = useState(false);
   const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
 
   useEffect(() => {
     const updateSize = () => {
       const w = window.innerWidth;
       let pageWidth = w < 640 ? 280 : w < 1024 ? 340 : 420;
       setSize({ width: pageWidth, height: pageWidth * 1.414 });
     };
     updateSize();
     window.addEventListener("resize", updateSize);
     return () => window.removeEventListener("resize", updateSize);
   }, []);
 
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
 
   useEffect(() => {
     const fetchPdf = async () => {
       try {
         const res = await axios.get(`http://localhost:3000/api/latest-promotion`);
         setPdfUrl(res.data.user[0].pdf);
        //  console.log(res.data.user[0].pdf)
       } catch (err) { console.error(err); }
     };
     fetchPdf();
   }, []);
 
   const handleMouseMove = (e) => {
     if (!isZoomed) return;
     const rect = e.currentTarget.getBoundingClientRect();
     const x = ((e.clientX - rect.left) / rect.width) * 100;
     const y = ((e.clientY - rect.top) / rect.height) * 100;
     setMousePos({ x, y });
   };
 
   return (<>
      <Header/>
     <div className="sm:min-h-screen h-auto pt-31 bg-[#050505] text-white flex flex-col items-center   font-sans overflow-hidden">
       
       {/* 🛠️ COMPACT HEADER */}
       <header className="w-full max-w-5xl sm:mb-12 mb-5 flex justify-between items-center bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md ">
         <div className="flex items-center gap-3">
           <div className={`p-2 rounded-lg ${isZoomed ? 'bg-yellow-400 text-black' : 'bg-white/5'}`}>
             <Maximize2 size={18} />
           </div>
           <h1 className="text-sm font-bold tracking-[0.2em] uppercase italic">Flyer </h1>
         </div>
         <button onClick={() => window.open(pdfurl)} className="bg-yellow-400 text-black px-5 py-2 rounded-full font-bold text-xs transition-transform active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(250,204,21,0.3)]">
           PDF SAVE
         </button>
       </header>
 
       {/* 📖 FLYER STAGE WITH INTEGRATED BUTTONS */}
       <main className="relative  flex-1 flex items-center justify-center w-full">
         
         {/* 📚 FLYER WRAPPER */}
         <div className="relative group p-4">
           
           {loading && (
             <div className="flex flex-col items-center gap-4">
               <Loader2 className="animate-spin text-yellow-400" size={32} />
               <p className="text-[10px] tracking-widest text-gray-500 uppercase">System Rendering...</p>
             </div>
           )}
 
           {pdfurl && <Document file={pdfurl} onLoadSuccess={convertPagesToImages} className="hidden" />}
 
           {/* ⬅️ PREV BUTTON (Edge Attached) */}
           {!isZoomed && !loading && (
             <button 
               onClick={() => bookRef.current.pageFlip().flipPrev()}
               className="absolute sm:left-[-20px] left-[-10] top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white text-black hover:bg-yellow-400 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] active:scale-90"
             >
               <ChevronLeft size={24} strokeWidth={3} />
             </button>
           )}
 
           {pageImages.length > 0 && (
             <div className="shadow-[0_60px_100px_-20px_rgba(0,0,0,1)] rounded-sm overflow-hidden border sm:w-auto w-90 border-white/5">
               <HTMLFlipBook 
                 width={size.width} 
                 height={size.height} 
                 showCover={true} 
                 ref={bookRef}
                 useMouseEvents={false}
                 clickEventForward={false}
                 className="mx-auto"
               >
                 {pageImages.map((img, i) => (
                   <div 
                     key={i} 
                     className="bg-white relative overflow-hidden select-none cursor-crosshair"
                     onDoubleClick={() => setIsZoomed(!isZoomed)}
                     onMouseMove={handleMouseMove}
                   >
                     <motion.img 
                       src={img} 
                       alt="page" 
                       className="w-full h-full object-cover shadow-inner"
                       animate={{ 
                         scale: isZoomed ? 2.5 : 1,
                         x: isZoomed ? `${(50 - mousePos.x) * 0.4}%` : 0,
                         y: isZoomed ? `${(50 - mousePos.y) * 0.4}%` : 0
                       }}
                       style={{ transformOrigin: `${mousePos.x}% ${mousePos.y}%` }}
                       transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
                     />
                   </div>
                 ))}
               </HTMLFlipBook>
             </div>
           )}
 
           {/* ➡️ NEXT BUTTON (Edge Attached) */}
           {!isZoomed && !loading && (
             <button 
               onClick={() => bookRef.current.pageFlip().flipNext()}
               className="absolute sm:right-[-20px] right-[15px] top-1/2 -translate-y-1/2 z-[10] p-4 rounded-full bg-white text-black hover:bg-yellow-400 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] active:scale-90"
             >
               <ChevronRight size={24} strokeWidth={3} />
             </button>
           )}
 
         </div>
       </main>
 
       <footer className="mt-auto py-6 text-white/15 text-[10px] tracking-[0.8em] font-gray-600 uppercase">
         Newton-tool Flyer
       </footer>
     </div>
     <Footer/>
   </>
   );
}

export default Promotion
