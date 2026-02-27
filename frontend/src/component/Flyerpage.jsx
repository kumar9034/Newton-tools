import React from 'react'
import HTMLFlipBook from "react-pageflip";
import Header from './Header';
import Footer from './Footer';
import Flyer from './Flyer';
import { useState } from 'react';


const Flyerpage = () => {
  const [zoom, setZoom] = useState(1);
  return (
    <div>
      <Header />
      <div className='pt-27'>
      <Flyer/>
      </div>
      <Footer />
    </div>
  )
}

export default Flyerpage
