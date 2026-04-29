import React, { useEffect, useRef } from 'react'
import Hero_section from './Hero_section'
import Header from './Header'
import Footer from './Footer'
import gsap from "gsap";
import axios from 'axios';


const Home = () => {
  const textRef = useRef(null);

  useEffect(() => {
  const el = textRef.current;

  gsap.fromTo(
    el,
    { x: "-100%" },      // completely outside from left
    {
      x: window.innerWidth, // go completely outside right
      duration: 15,
      ease: "linear",
      repeat: -1
    }
  );
}, []);
  useEffect(()=>{
    const fatch =async()=>{
      const res =await axios.get(`/`)
      console.log(res)
    }
    fatch()
  },[])


  return (
    <div >
      <Header/>
      <div className='pt-27'>
  <div className="w-full h-9 bg-yellow-500 overflow-hidden flex items-center relative">
    <p
      ref={textRef}
      className="absolute text-[#0609f7] whitespace-nowrap px-4"
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
