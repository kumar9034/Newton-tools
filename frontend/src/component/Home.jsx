import React, { useEffect, useRef } from 'react'
import Hero_section from './Hero_section'
import Header from './Header'
import Footer from './Footer'
import gsap from "gsap";


const Home = () => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { x: "0%" },
      {
        x: "100%",
        duration: 15,          // speed (lower = faster)
        ease: "linear",
        repeat: -1,            // infinite
      }
    );
  }, []);

  return (
    <div >
      <Header/>
      <div className='pt-27'>
         <div className="w-full h-9 bg-yellow-500 overflow-hidden flex items-center">
      <p
        ref={textRef}
        className="text-[#0609f7] whitespace-nowrap px-4"
      >
       Authorized Pneumatic & Power Tool Service & Support Specialists
      </p>
    </div>
      <Hero_section/>
      <Footer/>

      </div>
    </div>
  )
}

export default Home
