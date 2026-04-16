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
  const mobileMenuRef = useRef(null);
  const overlayRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

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

  // Active menu based on URL
  useEffect(() => {
    const index = menuItems.findIndex(
      (item) => item.path === location.pathname
    );
    if (index !== -1) setActiveIndex(index);
  }, [location.pathname]);

  // Desktop underline animation
  useEffect(() => {
    const el = menuRef.current[activeIndex];
    if (!el) return;

    gsap.set(indicatorRef.current, {
      width: el.offsetWidth,
      x: el.offsetLeft,
    });
  }, [activeIndex]);

  const handleClick = (index, path) => {
    const el = menuRef.current[index];
    setActiveIndex(index);
    navigate(path);
    setOpen(false);

    if (el) {
      gsap.to(indicatorRef.current, {
        width: el.offsetWidth,
        x: el.offsetLeft,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };

  // 📱 Mobile Drawer Animation
  useEffect(() => {
    if (open) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
      });

      gsap.fromTo(
        mobileMenuRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.45, ease: "power3.out" }
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
      });

      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [open]);

  return (
    <header className="w-full fixed z-50 font-montserrat">
      {/* TOP BAR */}
      <div className="bg-yellow-500 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
          <div className="flex gap-4 text-black font-medium">
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt size={20} /> Surrey
            </span>

            <a
              href="tel:6045033632"
              className="flex items-center gap-2 text-black"
            >
              <FaPhoneAlt />
              (604) 503-3632
            </a>
          </div>

          <div className="hidden md:flex gap-3 text-black">
            <AiFillTikTok size={21} />
            <RiInstagramFill size={20} />
            <FaFacebookSquare size={20} />
            <FaLinkedin size={20} />
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <img
            src="/WhatsApp_Image_2026-01-17_at_1.41.42_PM-removebg-preview (1).png"
            alt="Newton Tool"
            className="h-10 cursor-pointer"
            onClick={() => navigate("/")}
          />

          {/* Desktop Menu */}
          <nav className="hidden md:block relative">
            <ul className="flex gap-4 relative z-10">
              {menuItems.map((item, i) => (
                <li
                  key={i}
                  ref={(el) => (menuRef.current[i] = el)}
                  onClick={() => handleClick(i, item.path)}
                  className={`cursor-pointer px-3 py-2 font-medium transition
                    ${
                      activeIndex === i
                        ? "text-red-600"
                        : "text-black hover:text-red-500"
                    }`}
                >
                  {item.label}
                </li>
              ))}
            </ul>

            <span
              ref={indicatorRef}
              className="absolute left-0 top-full mt-1 h-[3px] bg-red-500 rounded-full"
            />
          </nav>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden text-2xl z-50"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      <div
        ref={overlayRef}
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm opacity-0 pointer-events-none md:hidden z-40"
      />

      {/* RIGHT SIDE DRAWER */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-screen w-[78%] max-w-sm bg-white shadow-2xl md:hidden z-50 p-6"
        style={{ transform: "translateX(100%)" }}
      >
        <div className="flex justify-end mb-8">
          <FaTimes
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        <nav className="flex flex-col gap-2 font-semibold text-lg">
          {menuItems.map((item, i) => (
            <div
              key={i}
              onClick={() => handleClick(i, item.path)}
              className={`py-3 px-4 rounded-lg cursor-pointer transition
                ${
                  activeIndex === i
                    ? "bg-red-500 text-white"
                    : "hover:bg-gray-100"
                }`}
            >
              {item.label}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;