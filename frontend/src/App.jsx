import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy Loaded Components
const Home = lazy(() => import("./component/Home"));
const Exclusive_product = lazy(() => import("./component/Exclusive_product"));
const About = lazy(() => import("./component/About"));
const Brands = lazy(() => import("./component/Brands"));
const StoreFinder = lazy(() => import("./component/Stores"));
const Flyerpage = lazy(() => import("./component/Flyerpage"));
const Promotion = lazy(() => import("./component/Promotion"));
const Fastener = lazy(() => import("./component/Fastener"));
const Service = lazy(() => import("./component/Service"));
const Careers = lazy(() => import("./component/Careers"));
const Login = lazy(() => import("./component/admin/Login"));
const Adminboard = lazy(() => import("./component/admin/Adminboard"));

const App = () => {
  return (
    <div>
      <Suspense fallback={<div style={{textAlign:"center", padding:"50px"}}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exclusive_product" element={<Exclusive_product />} />
          <Route path="/about" element={<About />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/stores" element={<StoreFinder />} />
          <Route path="/flyer" element={<Flyerpage />} />
          <Route path="/promotion" element={<Promotion />} />
          <Route path="/fastener" element={<Fastener />} />
          <Route path="/service" element={<Service />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Adminboard />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;