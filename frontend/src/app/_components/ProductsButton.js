import React from 'react'
import { FaVideo, FaDownload} from 'react-icons/fa'

const ProductsButton = ({ label, onClick, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'video':
        return <FaVideo className="text-med" aria-hidden="true" />
      case 'handout':
        return <FaDownload className="text-med" aria-hidden="true" />
    }
  }

  return (
    <button
      className="relative overflow-hidden w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-white bg-opacity-90 text-green-800 border-2 border-green-600 cursor-pointer group transition-all duration-300 hover:bg-opacity-100 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      onClick={onClick}
    >
      <div className="flex items-center justify-center gap-2 relative z-10">
        {getIcon()}
        <span className="text-sm sm:text-med font-medium whitespace-nowrap">{label}</span>
      </div>
      <div className="absolute inset-0 transform scale-x-0 origin-left bg-gradient-to-r from-green-100 to-green-300 transition-transform duration-[0.475s] group-hover:scale-x-100"></div>
    </button>
  )
}

export default ProductsButton;