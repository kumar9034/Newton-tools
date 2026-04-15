import axios from "axios";
import { useEffect, useState } from "react";

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🚀 Fetch slider images ONCE */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/allimageslider");
        setSlides(res?.data?.data || []);
      } catch (err) {
        console.error("Slider API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // ❌ slides dependency removed (IMPORTANT)

  /* 🎬 Auto slide */
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  /* ⏳ Loading state */
  if (loading) {
    return (
      <div className="h-[250px] flex items-center justify-center">
        <p>Loading slider...</p>
      </div>
    );
  }

  /* ❌ No slides fallback */
  if (slides.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[250px] relative"
          >
            <img
              src={slide.image_path}
              alt={slide.title || "slide"}
              className="w-full h-full object-cover"
              onError={(e) =>
                (e.target.src =
                  "https://dummyimage.com/1200x400/cccccc/000000&text=Image+Not+Found")
              }
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-center">
              <div className="px-4 sm:px-8 md:px-16 max-w-2xl text-white">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base">
                  {slide.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 👉 Next */}
      <button
        onClick={() =>
          setCurrent(current === slides.length - 1 ? 0 : current + 1)
        }
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 bg-white/80 p-2 sm:px-4 sm:py-2 rounded-full"
      >
        →
      </button>

      {/* 👉 Prev */}
      <button
        onClick={() =>
          setCurrent(current === 0 ? slides.length - 1 : current - 1)
        }
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 bg-white/80 p-2 sm:px-4 sm:py-2 rounded-full"
      >
        ←
      </button>
    </div>
  );
}