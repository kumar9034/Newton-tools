import React, { useState, useEffect, useRef } from "react";
import { FaPhoneAlt, FaBars, FaTimes, FaMapMarkerAlt } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import gsap from "gsap";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const indicatorRef = useRef(null);
  const menuRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Menu with label + path
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Flyer", path: "/flyer" },
    { label: "Promotion", path: "/promotion" },
    { label: "Fastener", path: "/fastener" },
    { label: "Brands", path: "/brands" },
    { label: "Repairs & Services", path: "/service" },
    { label: "About Us", path: "/about" },
    { label: "Careers", path: "/careers" },
  ];

  // 🔹 Set active menu based on URL (refresh safe)
  useEffect(() => {
    const index = menuItems.findIndex(
      (item) => item.path === location.pathname
    );
    if (index !== -1) setActiveIndex(index);
  }, [location.pathname]);

  // 🔹 Initial underline position
  useEffect(() => {
    const el = menuRef.current[activeIndex];
    if (!el) return;

    gsap.set(indicatorRef.current, {
      width: el.offsetWidth,
      x: el.offsetLeft,
    });
  }, [activeIndex]);

  // 🔹 Click handler
  const handleClick = (index, path) => {
    const el = menuRef.current[index];
    if (!el) return;

    setActiveIndex(index);
    navigate(path);
    setOpen(false);

    gsap.to(indicatorRef.current, {
      width: el.offsetWidth,
      x: el.offsetLeft,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <header className="w-full fixed z-50 font-montserrat">
      {/* TOP BAR */}
      <div className="bg-yellow-500 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
          <div className="flex gap-4 text-black font-medium">
            <span className="flex items-center gap-1">
              <a className="flex" href="">
              <FaMapMarkerAlt size={20} />Surrey 
              </a>
            </span>
            <a
              href="tel:6045033632"
              className="flex items-center gap-2 text-black  cursor-pointer"
            >
              <FaPhoneAlt className="mt-1" />
              <span>(604) 503-3632</span>
            </a>
          </div>

          <div className="hidden md:flex gap-3 text-black">
            <a href="">
              <AiFillTikTok size={21} />
            </a>
            <a href="https://www.instagram.com/newtontoolrepair/">
              <RiInstagramFill size={20} />
            </a>
            <a href="https://www.facebook.com/newtontoolrepairs/">
              <FaFacebookSquare size={20} />
            </a>
            <a href="">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* LOGO */}
          <img
            src="/WhatsApp_Image_2026-01-17_at_1.41.42_PM-removebg-preview.png"
            alt="Newton Tool"
            className="h-10 cursor-pointer"
            onClick={() => navigate("/")}
          />

          {/* DESKTOP MENU */}
          <nav className="hidden md:block relative">
            <ul className="flex gap-4 relative z-10">
              {menuItems.map((item, i) => (
                <li
                  key={i}
                  ref={(el) => (menuRef.current[i] = el)}
                  onClick={() => handleClick(i, item.path)}
                  className={`cursor-pointer px-3 py-2 font-medium transition
                    ${activeIndex === i
                      ? "text-red-600"
                      : "text-black hover:text-red-500"
                    }`}
                >
                  {item.label}
                </li>
              ))}
            </ul>

            {/* UNDERLINE */}
            <span
              ref={indicatorRef}
              className="absolute left-0 top-full mt-1 h-[3px] bg-red-500 rounded-full"
            />
          </nav>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-white border-t">
            <nav className="flex flex-col text-center font-semibold">
              {menuItems.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleClick(i, item.path)}
                  className={`py-3 border-b transition cursor-pointer
                    ${activeIndex === i
                      ? "bg-red-500 text-white"
                      : "hover:bg-gray-100"
                    }`}
                >
                  {item.label}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
