import { useEffect, useRef } from "react";
import gsap from "gsap";

const services = [
  { title: "dewalt-white-logo.webp", img: "OIP-removebg-preview.png", color: "#fdc131" },
  { title: "Makita_logo.png", img: "download-removebg-preview.png", color: "#0493ab" },
  { title: "atlas-home-brand-metabohpt.webp", img: "slazzer-preview-kgf6z.png", color: "#018058" },
  { title: "Bosch-Logo-2002-2018.png", img: "boschtools-removebg-preview.png", color: "#1b4c5d" },
  { title: "paslode (1).webp", img: "Paslode.webp", color: "#ef5423" },
  { title: "rolair-logo-436w.png", img: "Roleair-1-removebg-preview.png", color: "#1a720b" },
  { title: "portercable-logo.png", img: "slazzer-preview-bqvf0.png", color: "#cf152d" },
  { title: "bn-logo.png", img: "BNT-40X-Main-A-420x420-Photoroom.png", color: "#ff8043" },
  { title: "atlas-home-brand-ego.webp", img: "ego.webp", color: "rgb(167, 248, 54)" },
  { title: "iq-logo.avif", img: "slazzer-preview-fbb7j.png", color: "#e35b1b" },
  { title: "logo-flex.png", img: "slazzer-preview-0n7bh.png", color: "rgb(201, 17, 17)" },
  { title: "skil-logo.svg", img: "WhatsApp Image 2026-04-15 at 5.17.54 PM-Photoroom.png", color: "rgb(232, 57, 57)" },
];

const AuthorizedServiceMarquee = () => {
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      animationRef.current = gsap.fromTo(
        trackRef.current,
        { x: 0 },
        {
          x: "-50%",
          duration: 40,
          ease: "linear",
          repeat: -1,
          force3D: true, // 🔥 GPU acceleration
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full py-10 md:py-16 bg-gray-50 overflow-hidden">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-6 md:mb-10 text-black">
        Authorized Service Center
      </h2>

      <div className="overflow-hidden w-full h-auto py-3">
        <div
          ref={trackRef}
          className="flex gap-4 md:gap-6 w-max"
          style={{ willChange: "transform" }} // 🔥 smoother animation
          onMouseEnter={() => animationRef.current?.pause()}
          onMouseLeave={() => animationRef.current?.resume()}
        >
          {[...services, ...services].map((item, i) => (
            <div
              key={i}
              style={{ backgroundColor: item.color }}
              className="
                min-w-[200px] sm:min-w-[240px] md:min-w-[280px] lg:min-w-[320px]
                rounded-xl shadow-lg overflow-hidden
                hover:-translate-y-2 transition-transform duration-300
                flex flex-col items-center justify-between
              "
            >
              <img
                src={item.img}
                loading="lazy"
                alt="brand"
                className="
                  w-full 
                  h-[160px] sm:h-[200px] md:h-[240px] lg:h-[280px]
                  object-contain p-4
                "
              />

              <div className="w-full py-3 flex justify-center bg-black/20">
                <img
                  className="w-40 h-10 object-contain"
                  src={item.title}
                  alt="brand-logo"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorizedServiceMarquee;