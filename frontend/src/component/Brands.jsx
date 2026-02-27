import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { BoltIcon } from "@heroicons/react/24/solid";
import { Crown } from "lucide-react";
import Cardsbrands from './Cardsbrands';

const Brands = () => {
   const brands = [
    {brand : "3m.svg"},
    {brand : "allright-ladders-logo.webp"},
    { brand: "Arrow.webp"},
    { brand: "bissett-logo-1.webp"},
    { brand: "bostitch-1.webp"},
    { brand: "bn-logo.png"},
    { brand: "Cadex-Logo.png"},
    { brand: "CMT-logo.webp"},
    { brand: "Craftsman-logo.jpg"},
    { brand: "dap-logo.png"},
    { brand: "dewalt-logo-2.png"},
    { brand: "black-logo (1).svg"},
    { brand: "Diablo-logo.webp"},
    { brand: "dremel-logo.png"},
    { brand: "Edge-logo.webp"},
    { brand: "energizer-logo.svg"},
    { brand: "estwing-logo.png"},
    { brand: "EAB-logo.png"},
    { brand: "everwin-logo.webp"},
    { brand: "freud-logo.webp"},
    { brand: "garant-logo.png"},
    { brand: "gatorback-logo.jpg"},
    { brand: "Gecko-logo.webp"},
    { brand: "gorilla-logo.webp"},
    { brand: "gozo-logo.png"},
    { brand: "grex-tools.webp"},
    { brand: "greenline-logo.png"},
    { brand: "honeywell-logo.svg"},
    { brand: "hultafors-logo.webp"},
    { brand: "iform-logo.png"},
    { brand: "jbweld-logo.webp"},
    { brand: "irwin-logo-1.webp"},
    { brand: "krylon-logo.png"},
    { brand: "kunys_logo.gif"},
    { brand: "LX_Logo-With-Tagline_Updated.png"},
    { brand: "LePage-tools.webp"},
    { brand: "lufkin-logo.png"},
    { brand: "marshalltown-tools.png"},
    { brand: "max-logo.png"},
    { brand: "masterlock-logo.png"},
    { brand: "mechtools-logo.avif"},
    { brand: "metabo-logo.png"},
    { brand: "metabo-logo-1.avif"},
    { brand: "milwaukee-logo.png"},
    { brand: "mq-logo.jpg"},
    { brand: "norske-logo.jpg"},
    { brand: "olfa-logo.avif"},
    { brand: "omer-logo.svg"},
    { brand: "OX_LOGO.svg"},
    { brand: "paslode (1).webp"},
    { brand: "pica-logo-1.png"},
    { brand: "picquic-logo.jpg"},
    { brand: "portercable-logo.png"},
    { brand: "Ramset-logo.png"},
    { brand: "Rm-logo.avif"},
    { brand: "Richard-Logo.avif"},
    { brand: "richelieu-logo.png"},
    { brand: "rotozip-logo.png"},
    { brand: "sharpie-logo.svg"},
    { brand: "simpson-logo.png"},
    { brand: "stabila.png"},
    { brand: "Stanley-Logo-1.png"},
    { brand: "stiletto-logo.jpg"},
    { brand: "tajima-logo-1.jpg"},
    { brand: "task-logo.jpeg"},
    { brand: "titebond-logo.png"},
    { brand: "Screenshot_20260122_124947_Adobe_Acrobat-removebg-preview.png"},
    { brand: "tolsen-logo.webp"},
    { brand: "Tuck-logo.webp"},
    { brand: "turnx-logo.webp"},
    { brand: "viking-log.jpg"},
    { brand: "Wallboard-logo.avif"},
    { brand: "wd-40-logo.png"},
    
   ]
    
  return (
    <div>
      <Header/>
      <section className=" pt-27 py-24 px-4">
        {/* Brands Row */}
       <Cardsbrands/>
      <div className='flex flex-wrap gap-4 px-5 justify-center items-center'>
        {brands.map((items,id)=>( <div key={id} className='w-40 h-15 bg-orange-50 px-3 py-2 rounded-lg  '><img className='w-full h-full object-contain rounded-lg' src={items.brand} alt="" /></div>
          
        ))}
        </div>

    </section>
      <Footer/>
    </div>
  )
}

export default Brands
