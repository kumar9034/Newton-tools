import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Header from "./Header";
import Footer from "./Footer";

const Cardsbrands = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const rightCardsRef = useRef([]);
  const intervalRef = useRef(null);

  const brands = [
    {
    name : "Coil Nails",
    image : "ChatGPT Image Apr 16, 2026, 12_34_47 PM.png",
    desc : "Coil nails are nails arranged in a coil for use in nail guns, enabling fast and efficient fastening in construction and woodworking.",
    color: "#e3b549" 
  },
    {
    name : "Stick Nails",
    image : "ChatGPT Image Apr 16, 2026, 12_39_39 PM.png",
    desc : "Stick nails are nails arranged in a stick or strip for use in nail guns, providing convenience and efficiency in fastening applications.",
     color: "#a8ae06"
  },
    {
    name : "Bulk Nails",
    image : "ChatGPT Image Apr 16, 2026, 01_02_33 PM.png",
    desc : "Bulk nails are nails sold in large quantities for use in various fastening applications.",
    color: "#1b4c5d"
  },
    {
    name : "Screws",
    image : "ChatGPT Image Apr 16, 2026, 12_57_34 PM.png",
    desc : "Screws are fasteners with helical threads for use in various applications.",
    color: "#c8a105" 
  },
    {
    name : "Staples",
    image : "ChatGPT Image Apr 16, 2026, 12_41_23 PM.png",
    desc : "Staples are fasteners used in staplers for binding papers or other materials.",
    color: " #ce0909"
  },
    {
    name : "Finishing Nails",
    image : "ChatGPT Image Apr 16, 2026, 12_42_48 PM-Photoroom.png",
    desc : "Finishing nails are small nails used for finishing work, typically hidden under the surface of the material.",
    color: "#5e4014"
  },
    {
    name : "Steel Strap",
    image : "ChatGPT Image Apr 16, 2026, 12_54_55 PM.png",
    desc : "Steel straps are used for reinforcing and securing materials in construction and industrial applications.",
    color: "#0a2e49"
  },
    {
    name : "Anchors ",
    image : "ChatGPT Image Apr 16, 2026, 01_03_11 PM.png",
    desc : "Anchors are hardware devices used to secure objects to walls, floors, or other structures.",
    color: "#1b4c5d"
  }
  ]


  // const brands = [
  //   { name: "dewalt.png", desc: " GUARANTEED TOUGH - BUILT TO CHANGE THE WAY YOU WORK", image: "dewalt-tools-Photoroom.png", color: "#fdc131" },
  //   { name: "Makita_logo.png", desc: "Power tools for the long run.It's all the power you need.", image: "makit-tools-Photoroom.png", color: "#0493ab" },
  //   { name: "atlas-home-brand-metabohpt.webp", desc: "Durability First, Performance Always. Make Move GO with Metabo HPT", image: "matabo-tools-Photoroom.png", color: "#018058" },
  //   { name: "Bosch-Logo-2002-2018.png", desc: "Invented for Life. The More You Bosch, The More You Feel Like a Bosch", image: "bosch-tools-Photoroom.png", color: "#1b4c5d" },
  //   { name: "ChatGPT Image Jan 22, 2026, 02_36_42 PM.png", desc: "Hold It Together, with TRU-POINT Fastening Solutions, Trusted Every Day.", image: "Screenshot_20260122_130048_Chrome-removebg-preview.png", color: " #ce0909" },
  //   { name: "paslode (1).webp", desc: "Power. Productivity. Reputation. High-quality tools that enhance professionals' work", image: "Paslode.webp", color: "#ef5423" },
  //   { name: "bostitch-1-removebg-preview.png", desc: "Get to the Point , Innovative, reliable, durable Tools for the professional.", image: "Bustitch-removebg-preview.png", color: "#f89b36" },
  //   { name: "stabila.png", desc: "Level Up Your Work, Measure Up with Stabila.", image: "stabila-removebg-preview.png", color: "#ddd150" },
  //   { name: "rolair-logo-436w.png", desc: "Power Unplugged , Produce the finest compressors known to mankind.", image: "Roleair-1-removebg-preview.png", color: "#006633" },
  // ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeBrand = brands[activeIndex];

  /* ================= LEFT ANIMATION ================= */
  const animateLeft = () => {
    gsap.killTweensOf([imageRef.current, textRef.current]);

    gsap.fromTo(
      imageRef.current,
      { scale: 1.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, delay:0.5, ease: "power3.out" }
    );

    gsap.fromTo(
      textRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, delay: 0.5, ease: "power3.out" }
    );
  };

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % brands.length);
    }, 4000); // ⏱ change time here

    return () => clearInterval(intervalRef.current);
  }, []);

  /* ================= ON BRAND CHANGE ================= */
  useEffect(() => {
    animateLeft();
  }, [activeIndex]);

  /* ================= MANUAL CHANGE ================= */
  const changeBrand = (index) => {
    setActiveIndex(index);
  };

  return (<>
    <Header/>
    <section className="px-6 py-10 pt-35">
      <div className="flex flex-col lg:flex-row gap-10 w-full">

        {/* ================= LEFT ================= */}
        <div
          className="
          h-[50vh]
            relative w-full lg:w-[40%]
            p-6 lg:p-8
            rounded-3xl
            flex items-center justify-center
            overflow-hidden
            transition-colors duration-700
            lg:bg-transparent
          "
          style={{ backgroundColor: activeBrand.color }}
        >
          {/* Mobile Image */}
          <img
            src={activeBrand.image}
            alt=""
            className="w-[90%] h-[30vh] object-contain lg:hidden"
          />

          {/* Desktop Image */}
          <img
            ref={imageRef}
            src={activeBrand.image}
            alt=""
            className="hidden lg:block w-[80%] h-[45vh] mb-10 object-contain"
          />

          {/* Text */}
          <div
            ref={textRef}
            className="absolute left-4 bottom-4  lg:left-8 lg:bottom-8 max-w-xs"
          >
            <h2 className="text-white text-lg lg:text-2xl font-bold">
              {activeBrand.name}
            </h2>
            <p className="text-white mt-2 lg:mt-3 text-xs lg:text-sm">
              {activeBrand.desc}
            </p>
          </div>
        </div>

        {/* ================= RIGHT (DESKTOP ONLY) ================= */}
        <div className="hidden lg:grid lg:w-[60%] grid-cols-4 gap-4">
          {brands.map((brand, i) => (
            <div
              key={i}
              ref={(el) => (rightCardsRef.current[i] = el)}
              onMouseEnter={() => changeBrand(i)}
              onClick={() => changeBrand(i)}
              style={{ backgroundColor: brand.color }}
              className={`
                cursor-pointer p-5 rounded-2xl transition 
                ${activeIndex === i ? "scale-105 shadow-2xl" : ""}
              `}
            >
              <h2 className="text-white text-md lg:text-lg font-bold">{brand.name}</h2>
              <p className="text-white text-xs mt-2 line-clamp-2">{brand.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
    <Footer/>
  </>
  );
};

export default Cardsbrands;
