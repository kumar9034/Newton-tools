import React from "react";
import { MagnifyingGlassIcon, MapPinIcon, WrenchIcon } from "@heroicons/react/24/solid";
import Footer from "./Footer";
import Header from "./Header";
import StoreMap from "./google";

const stores = [
  {
    status: "OPEN NOW",
    statusColor: "bg-yellow-400 text-blue-900",
    name: "CHICAGO FLAGSHIP",
    address: "123 Industrial Way, Chicago, IL 60601",
    distance: "1.2 miles away",
  },
  {
    status: "CLOSED",
    statusColor: "bg-gray-300 text-gray-700",
    name: "NAPERVILLE NORTH",
    address: "400 Tool Court, Naperville, IL 60540",
    distance: "4.8 miles away",
  },
  {
    status: "OPEN NOW",
    statusColor: "bg-yellow-400 text-blue-900",
    name: "SCHAUMBURG HUB",
    address: "88 Commerce Dr, Schaumburg, IL 60173",
    distance: "12.5 miles away",
  },
];

const StoreFinder = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-100 pt-29 flex flex-col md:flex-row">
      
      {/* LEFT SIDEBAR */}
      <div className="w-full md:w-[360px] bg-white shadow-lg flex flex-col">
        
        {/* Header */}
        <div className="bg-blue-900 p-4 sm:p-5 text-white">
          <h2 className="text-base sm:text-lg font-bold mb-3">
            NEWTON STORE FINDER
          </h2>

          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-blue-200" />
            <input
              type="text"
              placeholder="Search City or Zip..."
              className="w-full pl-10 py-2 rounded-lg bg-blue-800
                         text-white placeholder-blue-200
                         focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Store List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
          {stores.map((store, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${store.statusColor}`}
                >
                  {store.status}
                </span>
                <span className="text-xs text-gray-500">
                  {store.distance}
                </span>
              </div>

              <h3 className="font-bold text-blue-900 text-sm sm:text-base">
                {store.name}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {store.address}
              </p>

              {store.status === "OPEN NOW" && (
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button className="flex-1 bg-gray-100 text-blue-900 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-200">
                    DIRECTIONS
                  </button>
                  <button className="flex-1 bg-gray-100 text-blue-900 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-200">
                    STORE DETAILS
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT MAP AREA */}
      {/* <div className="flex-1 flex items-center justify-center relative
                      min-h-[300px] md:min-h-screen bg-gray-200 p-4">
        
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 text-center max-w-sm w-full">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full
                          bg-gray-100 flex items-center justify-center">
            <MapPinIcon className="w-7 h-7 sm:w-8 sm:h-8 text-blue-900" />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-blue-900">
            INTERACTIVE STORE MAP
          </h3>

          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Real-time inventory and store status
          </p>
        </div>

        {/* Floating Button */}
        <button
          className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6
                     w-11 h-11 sm:w-12 sm:h-12 rounded-full
                     bg-blue-800 text-white
                     flex items-center justify-center shadow-lg"
                     >
          <WrenchIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
          <StoreMap/>
      {/* </div> */}

        
    </div>
    <Footer/>
    </>
  );
};

export default StoreFinder;
