import React, { useRef, useState } from 'react'
import Header from './Header'
import Footer from './Footer'

const Service = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const rightCardsRef = useRef([]);

  const brands = [
    { brand: "bissett-logo-1.webp" },
    { brand: "Bosch-Logo-2002-2018.png" },
    { brand: "bn-logo.png" },
    { brand: "Cadex-Logo.png" },
    { brand: "dewalt.png" },
    { brand: "atlas-home-brand-ego.webp" },
     { brand: "everwin-logo.webp"},
    { brand: "logo-flex.png" },
    { brand: "grex-tools.webp" },
    { brand: "iq-logo.avif" },
    { brand: "max-logo.png" },
    { brand: "Makita_logo.png" },
    { brand: "mq-logo.jpg"},
    { brand: "atlas-home-brand-metabohpt.webp" },
    { brand: "omer-logo.svg" },
    { brand: "paslode (1).webp" },
    { brand: "portercable-logo.png" },
    { brand: "rolair-logo-436w.png" },
    { brand: "simpson-logo.png" },
    { brand: "skil-logo.svg" },
    { brand: "stabila.png" },
    { brand: "Screenshot_20260122_124947_Adobe_Acrobat-removebg-preview.png" },
    { brand: "tolsen-logo.webp" },
    { brand: "Ramset-logo.png"},

  ]
  const brandcards = [
    { name: "dewalt.png",  color: "#fdc131" },
    { name: "Makita_logo.png",  color: "#0493ab" },
    { name: "atlas-home-brand-metabohpt.webp",  color: "#018058" },
    { name: "Bosch-Logo-2002-2018.png",  color: "#1b4c5d" },
    { name: "rolair-logo-436w.png", color: "#006633" },
    { name: "portercable-logo.png", color: "#e72a33" },
    { name: "atlas-home-brand-ego.webp ", color: "#a7f836" },
    { name: "skil-logo.svg", color: "#c0490a" },
    { name: "logo-flex.png", color: "#c91111" },
    { name: "bn-logo.png", color: "#ff8043" },
    { name: "paslode (1).webp", color: "#ef5423" },
    { name: "iq-logo.avif", color: "#f26423" },
  ];

  const services = [
    {
      title: "Warranty Repair",
      desc: "Expert repair for power & hand tools.",
      image: "ChatGPT Image Jan 24, 2026, 03_31_32 PM.png",
    },
    {
      title: "Tool Servicing",
      desc: "Regular maintenance & servicing.",
      image: "service.webp",
    },
    {
      title: "Spare Parts",
      desc: "Genuine & compatible tool parts.",
      image: "ChatGPTImageApr15202604_25_25P.jpeg",
    },
    {
      title: "Sharpening",
      desc: "Precision sharpening services.",
      image: "sharpening .jpeg",
    },
  ];

  return (
    <div>
      <Header />
      <div className="bg-gray-50 min-h-screen py-10 px-4 pt-30 md:px-12">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">
            Repairs & Service
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Professional repair, servicing, and maintenance for industrial and power tools.
          </p>
        </div>

        {/* Services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {services.map((item, index) => (
            <div
              key={index}
              className="relative h-[280px] rounded-xl p-4 overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition transform duration-300 hover:scale-104"
            >
              {/* Image */}
              <div className="absolute inset-0">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text content with blur bg */}
              <div className="relative z-10 h-full flex flex-col justify-end ">
                <div className="bg-black/40 backdrop-blur-md rounded-lg p-2">
                  <h3 className="text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-200 mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Authorized Service Centre */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-14">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Authorized Service Centre
          </h2>
          <p className="text-gray-600">
            We are an authorized service centre providing reliable and certified
            repair solutions using genuine parts and trained technicians.
          </p>
          <div
            className="
                        w-full
                        flex flex-wrap
                        justify-center items-center
                        gap-3 sm:gap-4 md:gap-5
                        mt-4 sm:mt-5 md:mt-6
                      "
          >
            {brandcards.map((brand, i) => (
              <div
                key={i}
                ref={(el) => (rightCardsRef.current[i] = el)}
                onMouseEnter={() => changeBrand(i)}
                onClick={() => changeBrand(i)}
                style={{ backgroundColor: brand.color }}
                className={`w-[45%] sm:w-[15%]
        cursor-pointer p-4 rounded-2xl transition-all duration-300
        ${activeIndex === i ? "scale-110 shadow-2xl" : "hover:scale-105"}
      `}
              >
                <img
                  src={brand.name}
                  alt=""
                  className="w-32 h-20 object-contain"
                />
              </div>
            ))}
          </div>


        </div>

        {/* Brands We Repair */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Brands We Repair
          </h2>

          <div className="flex flex-wrap gap-5 ">
            {brands.map((brand, index) => (
              <div
                key={index}
                className=" sm:w-40 w-[45%] h-auto py-2 px-2  rounded-lg bg-gray-400"
              >
                {<img className='w-full h-10 object-contain ' src={brand.brand} alt="" />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Service
