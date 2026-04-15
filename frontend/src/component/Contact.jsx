import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const stores = [
  {
    name: "Newton Tool Repair Ltd.",
    address: " #114 7533 135 St, Surrey, BC V3W 0N6, Canada",
    lat: 49.1576,
    lng: -122.8473,
  },
  
];



const Contact = () => {
  const [selectedStore, setSelectedStore] = useState(stores[0]);
  
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2610.234576066871!2d-122.851421224636!3d49.13917048090765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485da2be863e355%3A0x9ebc7e9a8d4d8d30!2sNewton%20Tool%20Repair!5e0!3m2!1sen!2sin!4v1769660652553!5m2!1sen!2sin`;


  const openDirections = () => {
    window.open(
      `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2610.234576066871!2d-122.851421224636!3d49.13917048090765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485da2be863e355%3A0x9ebc7e9a8d4d8d30!2sNewton%20Tool%20Repair!5e0!3m2!1sen!2sin!4v1769660652553!5m2!1sen!2sin`,
    );
  };
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT MAP */}
        <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg">

          {/* MAP */}
          <iframe
            title="Store Location"
            src={mapSrc}
            className="w-full h-full border-0"
            loading="lazy"
          />

          {/* CUSTOM MARKER */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative">
              <span className="absolute w-16 h-16 bg-yellow-400/40 rounded-full animate-ping"></span>
              <span className="w-4 h-4 bg-yellow-500 rounded-full block"></span>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold italic uppercase text-[#0b2b46]">
           Contact Us
          </h2>

          {/* STORE INFO */}
          <h3 className="mt-6 text-xl md:text-2xl font-bold text-gray-800">
            {selectedStore.name}
          </h3>

          <p className="mt-3 text-gray-600 leading-relaxed">
            {selectedStore.address}
            <br />
           <a
                         href="tel:6045033632"
                         className="flex items-center gap-2   cursor-pointer"
                       >
                         <FaPhoneAlt className="mt-1" />
                         <span>(604) 503-3632</span>
                       </a>
            <p className="flex gap-2"><MdEmail className="mt-2" size={20} />sales@newtontool.ca</p>
          </p>


          {/* BUTTON */}
          <button
            onClick={openDirections}
            className="mt-8 inline-flex items-center gap-3 bg-blue-900 text-white px-8 py-4 font-bold uppercase tracking-wider shadow-lg hover:bg-blue-800 transition"
          >
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            Get Directions
            <span className="text-xl">→</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Contact;
