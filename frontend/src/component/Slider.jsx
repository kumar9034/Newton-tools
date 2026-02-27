import axios from "axios";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Professional Tools",
    desc: "Our professional tools are designed to meet the highest standards of quality, strength, and precision.",
    image: "ChatGPT Image Jan 23, 2026, 12_45_06 PM.png"
  },
  {
    title: "Trusted Performance",
    desc: "Engineered to deliver trusted performance using high-quality materials and durability testing.",
    image: "slider-2.png"
  },
  {
    title: "Fast & Reliable",
    desc: "Built to deliver fast performance and reliable results for professional and everyday use.",
    image: "Bosch-banner_new_revised.jpg"
  }
];

export default function Slider() {
  const [current, setCurrent] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    const fatchdata  = async()=>{
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/allimageslider`)

      console.log(res.data.data)

    }
    fatchdata()
  }, [])



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
            {/* Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
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

      {/* Controls */}
      <button
        onClick={() =>
          setCurrent(current === slides.length - 1 ? 0 : current + 1)
        }
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 bg-white/80 p-2 sm:px-4 sm:py-2 rounded-full"
      >
        →
      </button>

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
