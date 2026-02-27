import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";

import worker from "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs?url";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = worker;

export default function Try() {
  const [numPages, setNumPages] = useState(null);
    console.log(numPages)
  return (

    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      <div style={{ width: "800px", height: "600px" }}>
        <Document
          file="/wintersell.pdf"
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {numPages && (
            <HTMLFlipBook
              width={400}
              height={600}
              size="fixed"
              showCover={true}
              mobileScrollSupport={true}
            >
              {Array.from({ length: numPages }, (_, index) => (
                <div
                  key={index}
                  className="bg-white flex justify-center items-center"
                >
                  <Page
                    pageNumber={index + 1}
                    width={400}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              ))}
            </HTMLFlipBook>
          )}
        </Document>
      </div>
    </div>

  );
}
