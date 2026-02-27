import React from 'react'
import {
  ShieldCheckIcon,
  UsersIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import Header from './Header';
import Footer from './Footer';

const About = () => {
  return (
  <>
    <Header/>
    <section className="w-full bg-gray-50 pt-30 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-900">
            About Newton Tools
          </h2>
          <p className="mt-3 text-lg font-semibold text-yellow-500">
            AUTHORIZED PNEUMATIC & POWER TOOL SPECIALIST
          </p>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <p className="text-gray-700 leading-relaxed text-lg text-center">
            <span className="font-semibold text-blue-900">Newton Tools</span> is a
            trusted name in the tools industry, specializing in high-quality
            pneumatic and power tools for industrial, commercial, and
            professional use. We are committed to delivering reliable,
            performance-driven solutions that help businesses work smarter and
            faster.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Who We Are */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-blue-900 mb-3">
              Who We Are
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Newton Tools is an authorized dealer and specialist in pneumatic
              and power tools. Backed by industry expertise and technical
              knowledge, we help customers choose the right tools for maximum
              efficiency and long-term reliability.
            </p>
          </div>

          {/* What We Offer */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-blue-900 mb-3">
              What We Offer
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✔ Pneumatic & Air Tools</li>
              <li>✔ Industrial & Commercial Power Tools</li>
              <li>✔ Cutting, Grinding & Drilling Solutions</li>
              <li>✔ Genuine Spare Parts & Accessories</li>
              <li>✔ Technical Support & After-Sales Service</li>
            </ul>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-blue-900 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to empower professionals and industries with
              durable, precise, and high-performance tools that improve
              productivity while maintaining safety and quality standards.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-blue-900 mb-3">
              Why Choose Newton Tools?
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✔ Authorized & Trusted Tool Specialist</li>
              <li>✔ Genuine Products from Leading Brands</li>
              <li>✔ Competitive Pricing</li>
              <li>✔ Multiple Store Locations</li>
              <li>✔ Reliable After-Sales Support</li>
            </ul>
          </div>
        </div>

        {/* Bottom Highlight */}
        <div className="mt-14 bg-blue-900 text-white rounded-2xl p-8 text-center">
          <h3 className="text-3xl font-bold mb-3">
            Build Strong. Work Smart.
          </h3>
          <p className="text-yellow-400 text-lg font-semibold">
            Choose Newton Tools for Power, Precision & Performance
          </p>
        </div>

      </div>
    </section>
    <Footer/>
  </>
  )
}

export default About
