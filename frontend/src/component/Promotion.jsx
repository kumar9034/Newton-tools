import React from 'react'
import Header from './Header'
import Footer from './Footer'
import FlyerViewer from './Flyer'

const Promotion = () => {
  return (
    <div>
      <Header/>
      <div className='w-full h-auto pt-30'>
      <FlyerViewer/>
      </div>
      <Footer/>
    </div>
  )
}

export default Promotion
