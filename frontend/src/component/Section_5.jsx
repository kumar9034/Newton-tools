import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section5 = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const highlightRefs = useRef([]);
  const featureRefs = useRef([]);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          highlightRefs.current,
          {
            scale: 0.7,
            opacity: 0,
            stagger: 0.2,
            duration: 0.4,
            ease: "back.out(2)",
          },
          "-=0.4"
        )
        .from(
          featureRefs.current,
          {
            x: -40,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(
          imageRef.current,
          {
            scale: 1.15,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          badgeRef.current,
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.8)",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert(); // 🔥 CLEANUP
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-br from-black via-red-900 to-black py-16 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT */}
        <div>
          <h1
            ref={headingRef}
            className="text-white font-hero font-extrabold uppercase leading-tight text-3xl md:text-5xl"
          >
            Built for Professionals
            <br />
            <span
              ref={(el) => (highlightRefs.current[0] = el)}
              className="text-yellow-500 inline-block"
            >
              Who Demand
            </span>
            <br />
            <span
              ref={(el) => (highlightRefs.current[1] = el)}
              className="text-yellow-500 inline-block"
            >
              More
            </span>
          </h1>

          <div className="mt-10 grid grid-cols-1 font-hero sm:grid-cols-2 gap-5">
            {[
              "Precision-Engineered Tools",
              "Premium Materials",
              "Long Service Life",
              "Competitive Pricing",
              "Professional Support",
            ].map((item, i) => (
              <div
                key={i}
                ref={(el) => (featureRefs.current[i] = el)}
                className="flex items-center gap-3"
              >
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-500 text-black font-bold text-sm">
                  ✓
                </span>
                <p className="text-white text-sm font-medium tracking-wide">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center">
          <div
            ref={imageRef}
            className="relative rounded-2xl overflow-hidden border border-yellow-500/30 shadow-2xl"
          >
            <img
              src="/image-1.jpg"
              alt="Professional Tools"
              loading="lazy"
              className="w-full max-w-md object-cover grayscale"
            />
          </div>

          <div
            ref={badgeRef}
            className="absolute -left-6 bottom-10 bg-yellow-600 text-white rounded-xl px-6 py-5 shadow-xl"
          >
            <h3 className="text-3xl font-extrabold leading-none">13+</h3>
            <p className="text-xs font-hero uppercase tracking-widest mt-1">
              Years of Trust
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section5;