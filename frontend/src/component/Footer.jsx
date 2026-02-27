import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaClock } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white font-montserrat">
      
      {/* Top Yellow Bar */}
      <div className="h-3 bg-yellow-500"></div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div>
          <img
            src="WhatsApp_Image_2026-01-17_at_1.41.42_PM-removebg-preview.png"
            alt="Newton Tool"
            className="h-10"
          />


          <p className="mt-4 text-gray-300 leading-relaxed text-sm ">
          Newton Tool serves the Lower Mainland community by providing industrial pneumatic and power tool repairs, fasteners, and related services. Since 2013, it has fulfilled contractors’, manufacturers’, and businesses’ requirements for tool repair and fastener needs, offering pneumatic tool repairs, power tool servicing, preventive maintenance, and authorized warranty work.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-yellow-500 font-bold tracking-widest uppercase mb-6">
            Services
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li>Pneumatic Tool Repairs</li>
            <li>Power Tool Servicing</li>
            <li>Preventive Maintenance</li>
            <li>Authorized Warranty Work</li>
            <li>Industrial Tool Sales</li>
          </ul>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-yellow-500 font-bold tracking-widest uppercase mb-6">
            Links
          </h3>
          <ul className="space-y-3 font-semibold">
            <li><a href="#" className="hover:text-yellow-400">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400">About</a></li>
            <li><a href="#" className="hover:text-yellow-400">Brands</a></li>
            <li><a href="#" className="hover:text-yellow-400">Flyer</a></li>
            <li><a href="#" className="hover:text-yellow-400">Locations</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-yellow-500 font-bold tracking-widest uppercase mb-6">
            Contact
          </h3>

          <ul className="space-y-4 text-gray-300">
            <li className="flex gap-3">
              <FaMapMarkerAlt className="text-yellow-500 mt-1" />
              #114 7533 135 St, Surrey, BC V3W 0N6, Canada
            </li>
            <li className="flex gap-3">
              <FaPhoneAlt className="text-yellow-500 mt-1" />
              (604) 503-3632
            </li>
            <li className="flex gap-3">
              <FaEnvelope className="text-yellow-500 mt-1" />
              info@newtontool.com
            </li>
            <li className="flex gap-3">
              <FaClock className="text-yellow-500 mt-1" />
              Mon – Fri: 8:00 AM – 5:00 PM
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-800 py-6 text-center text-sm text-gray-300">
        © 2026 NEWTON TOOL REPAIR LTD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
