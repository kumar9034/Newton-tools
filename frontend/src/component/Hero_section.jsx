import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Flyer from "./Flyer";
import Slider from "./Slider";
import Category from "./Category";
import Contact from "./Contact";
import Section5 from "./Section_5";
import Cardsbrands from "./Cardsbrands";
import { useNavigate } from "react-router-dom";
import { FaInstagramSquare } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";

const Hero_section = () => {
  const trackRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const rightCardsRef = useRef([]);
  const navigate = useNavigate()

  // Subscription form state
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const brands = [
    { brand: "3m.svg" },
    { brand: "allright-ladders-logo.webp" },
    { brand: "Arrow.webp" },
    { brand: "bissett-logo-1.webp" },
    { brand: "bostitch-1.webp" },
    { brand: "bn-logo.png" },
    { brand: "Cadex-Logo.png" },
    { brand: "CMT-logo.webp" },
    { brand: "Craftsman-logo.jpg" },
    { brand: "dap-logo.png" },
    { brand: "dewalt-logo-2.png" },
    { brand: "black-logo (1).svg" },
    { brand: "Diablo-logo.webp" },
    { brand: "dremel-logo-Photoroom.png" },
    { brand: "Edge-logo.webp" },
    { brand: "energizer-logo.svg" },
    { brand: "estwing-logo.png" },
    { brand: "EAB-logo.png" },
    { brand: "everwin-logo.webp" },
    { brand: "freud-logo.webp" },
    { brand: "garant-logo.png" },
    { brand: "gatorback-logo.jpg" },
    { brand: "Gecko-logo.webp" },
    { brand: "gorilla-logo.webp" },
    { brand: "gozo-logo.png" },
    { brand: "grex-tools.webp" },
    { brand: "greenline-logo.png" },
    { brand: "honeywell-logo.svg" },
    { brand: "hultafors-logo.webp" },
    { brand: "iform-logo.png" },
    { brand: "jbweld-logo.webp" },
    { brand: "irwin-logo-1.webp" },
    { brand: "krylon-logo.png" },
    { brand: "kunys_logo.gif" },
    { brand: "LX_Logo-With-Tagline_Updated.png" },
    { brand: "LePage-tools.webp" },
    { brand: "lufkin-logo.png" },
    { brand: "marshalltown-tools.png" },
    { brand: "max-logo.png" },
    { brand: "masterlock-logo.png" },
    { brand: "mechtools-logo.avif" },
    { brand: "metabo-logo.png" },
    { brand: "metabo-logo-1.avif" },
    { brand: "milwaukee-logo.png" },
    { brand: "mq-logo.jpg" },
    { brand: "norske-logo.jpg" },
    { brand: "olfa-logo.avif" },
    { brand: "omer-logo.svg" },
    { brand: "OX_LOGO.svg" },
    { brand: "paslode (1).webp" },
    { brand: "pica-logo-1.png" },
    { brand: "picquic-logo.jpg" },
    { brand: "portercable-logo.png" },
    { brand: "Ramset-logo.png" },
    { brand: "Rm-logo.avif" },
    { brand: "Richard-Logo.avif" },
    { brand: "richelieu-logo.png" },
    { brand: "rotozip-logo.png" },
    { brand: "sharpie-logo.svg" },
    { brand: "simpson-logo.png" },
    { brand: "stabila.png" },
    { brand: "Stanley-Logo-1.png" },
    { brand: "stiletto-logo.jpg" },
    { brand: "tajima-logo-1.jpg" },
    { brand: "task-logo.jpeg" },
    { brand: "titebond-logo.png" },
    { brand: "Screenshot_20260122_124947_Adobe_Acrobat-removebg-preview.png" },
    { brand: "tolsen-logo.webp" },
    { brand: "Tuck-logo.webp" },
    { brand: "turnx-logo.webp" },
    { brand: "viking-log.jpg" },
    { brand: "Wallboard-logo.avif" },
    { brand: "wd-40-logo.png" },

  ]



  /* LEFT IMAGE + TEXT ANIMATION */





  /* MARQUEE */
  useEffect(() => {
    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2;

    const tween = gsap.to(track, {
      x: `-${totalWidth}px`,
      duration: 130,
      ease: "linear",
      repeat: -1,
    });

    return () => tween.kill();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear message when user starts typing
    setMessage({ type: "", text: "" });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "✓ " + data.message,
        });
        // Reset form
        setFormData({
          name: "",
          phone: "",
          email: ""
        });
        // Clear success message after 5 seconds
        setTimeout(() => setMessage({ type: "", text: "" }), 5000);
      } else {
        setMessage({
          type: "error",
          text: "✗ " + data.message,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        type: "error",
        text: "✗ Failed to subscribe. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= BRAND SHOWCASE ================= */}
      <div className="h-auto w-full">

        <Cardsbrands />

        {/* ================= OTHER SECTIONS ================= */}
        <Flyer />
        <Slider />
        <Category />
        <Section5 />

      </div>
      {/* ================= MARQUEE ================= */}
      <section className="bg-white py-16 px-0 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between mb-10 gap-6 px-5">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold italic uppercase text-blue-950">
              Trusted Brands, Proven Performance
            </h2>
            <p className="mt-2 text-gray-600 text-sm max-w-xl">
              We work with reliable brands that meet strict quality standards.
            </p>
          </div>

          <button onClick={() => { navigate("/brands") }} className="flex items-center gap-2 bg-blue-900 text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-blue-800 transition w-fit">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            View Brands
          </button>
        </div>

        <div
          className="overflow-hidden "
          onMouseEnter={() => gsap.globalTimeline.pause()}
          onMouseLeave={() => gsap.globalTimeline.resume()}
        >
          <div ref={trackRef} className="flex gap-4 w-full">
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={i}
                className="min-w-[150px] md:min-w-[180px] border border-gray-200 py-5 px-4 rounded-xl bg-gray-100 shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={brand.brand}
                  alt=""
                  className="mx-auto h-8 md:h-10 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
      <section className="flex flex-col justify-center items-center text-center bg-yellow-500 px-4 py-10 sm:py-14">

        {/* Heading */}
        <h1 className="flex flex-col gap-2 text-sm sm:text-base font-[600] max-w-4xl">

          <span className="text-lg sm:text-3xl md:text-4xl font-[700] leading-tight">
            BE THE FIRST TO KNOW
          </span>
          <p>stay in loop about new tools, sales, and promotions</p>
        </h1>

        <div className="w-full max-w-3xl mt-5 mb-8 gap-5 flex flex-wrap  justify-center items-center">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-md outline-none border border-black/40 focus:border-black"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone no."
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-md outline-none border border-black/40 focus:border-black"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-md outline-none border border-black/40 focus:border-black"
            />
          </form>


          {/* Message display */}
          {message.text && (
            <div
              className={`w-full text-center py-2 rounded-md ${message.type === "success"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                }`}
            >
              {message.text}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            type="button"
            className="bg-black w-[40%] text-white px-6 py-3 rounded-md font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </div>

        <span className="text-sm sm:text-base">
          Tag <strong className="text-[#0609f4]">#Newtontoolrepair</strong> and <strong className="text-[#0609f4]">@Newtontool</strong> for a chance to be featured on socials.
        </span>
        {/* Follow Us */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 sm:mt-5">
          <p className="font-[700] text-lg sm:text-xl">Follow Us:</p>

          <div className="flex gap-4 text-black">
            <a href="http://tiktok.com/%40newton.tool" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <AiFillTikTok size={32} />
            </a>

            <a href="https://www.instagram.com/newtontoolrepair/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <RiInstagramFill size={32} />
            </a>

            <a href="https://www.facebook.com/newtontoolrepairs/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <FaFacebookSquare size={32} />
            </a>

            <a href="#" className="hover:scale-110 transition-transform">
              <FaLinkedin size={32} />
            </a>

            <a href="https://wa.me/16045033632" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
              <IoLogoWhatsapp size={32} />
            </a>
          </div>
        </div>
        {/* SUBSCRIBE FORM */}

      </section>

    </>
  );
};

export default Hero_section;
