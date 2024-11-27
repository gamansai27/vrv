'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { FileText, Download, Eye, ChevronRight } from 'lucide-react'

const crops = [
  { name: 'Bhendi', icon: '🌿' },
  { name: 'Bittergourd', icon: '🥒' },
  { name: 'Chilli', icon: '🌶️' },
  { name: 'Cucumber', icon: '🥒' },
  { name: 'Maize', icon: '🌽' },
  { name: 'Paddy', icon: '🌾' },
  { name: 'Ridgegourd', icon: '🥬' },
  { name: 'Spongegourd', icon: '🥬' },
  { name: 'Tomato', icon: '🍅' },
  { name: 'Watermelon', icon: '🍉' }
]

const handouts = {
  Cucumber: [
    { name: 'Meera 27', file: 'meera_27_handout.pdf' },
    { name: 'Ramani 27', file: 'ramani_27_handout.pdf' }
  ],
  Tomato: [
    { name: 'Red Star', file: 'red_star_handout.pdf' },
    { name: 'Sun Bright', file: 'sun_bright_handout.pdf' }
  ],
}

export default function Handouts() {
  const [selectedCrop, setSelectedCrop] = useState(null)
  const handoutRef = useRef(null)

  const handleCropClick = (cropName) => {
    setSelectedCrop(cropName)
    setTimeout(() => {
      if (handoutRef.current) {
        handoutRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
       <div className="relative min-h-screen w-full p-6 md:p-8 bg-cover">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-[url('/handoutsbg.jpg')] bg-cover filter"
        style={{ zIndex: -1 }}
      ></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-green-900 text-center">
          Crop Handouts
        </h1>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-900 text-center mb-6 md:mb-8">
          Select Crops
        </h2>

        {/* Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {crops.map((crop) => (
            <button
              key={crop.name}
              onClick={() => handleCropClick(crop.name)}
              className={`bg-white border-2 border-green-700 rounded-lg p-2 sm:p-3 flex items-center justify-between transition-all duration-300 hover:bg-green-100 hover:shadow-lg hover:scale-105 ${
                selectedCrop === crop.name ? 'bg-green-800 border-green-800' : ''
              }`}
            >
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="text-base md:text-lg md:text-xl">{crop.icon}</span>
                <span className="text-xs md:text-sm md:text-base font-semibold text-green-800 truncate">
                  {crop.name}
                </span>
              </div>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
            </button>
          ))}
        </div>

        {/* Handouts Section */}
        {selectedCrop && (
          <div ref={handoutRef} className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 mt-6 sm:mt-8 md:mt-12">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-800 mb-3 sm:mb-4 md:mb-6 flex items-center">
              <span className="mr-2 text-xl sm:text-2xl md:text-3xl">
                {crops.find((c) => c.name === selectedCrop).icon}
              </span>
              {selectedCrop} Handouts
            </h3>
            
            {handouts[selectedCrop] ? (
              <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {handouts[selectedCrop].map((handout) => (
                  <div key={handout.name} className="bg-blue-100 rounded-lg p-2 sm:p-3 md:p-4 shadow-md">
                    <div className="flex items-center mb-2 sm:mb-3">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2" />
                      <span className="text-xs sm:text-sm md:text-base font-medium text-black">
                        {handout.name}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.open(`/handouts/${handout.file}`, '_blank')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-md transition-colors duration-200 flex items-center justify-center text-xs sm:text-sm"
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => (window.location.href = `/handouts/${handout.file}`)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-md transition-colors duration-200 flex items-center justify-center text-xs sm:text-sm"
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs sm:text-sm md:text-base text-center text-gray-500">
                No handouts available for this crop.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}