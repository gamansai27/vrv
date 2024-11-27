"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import cropVariety from "../../../../public/crops";
import VarietyDescription from "../../../../public/variety";
import ProductsButton from "../../_components/ProductsButton";

export default function VarietyTypes({ params }) {
  const [selectedVariety, setSelectedVariety] = useState(null);
  const [varietyDesc, setVarietyDesc] = useState(null);

  const handleSelect = (variety) => {
    const selectedDescription = VarietyDescription.find(
      (variant) => variant.varietyName === variety
    );
    setSelectedVariety(variety);
    setVarietyDesc(selectedDescription);
  };

  const handleClose = () => {
    setSelectedVariety(null);
    setVarietyDesc(null);
  };

  const handleFieldVideoClick = () => {
    console.log("Field video button clicked!");
  };

  const handleHandoutClick = () => {
    console.log("Handout button clicked!");
  };

  const crop = cropVariety.all.find(
    (type) => type.url === "/crops/" + params.croptype
  );

  if (!crop) {
    return <div>Crop not found</div>;
  }

  const formatDescription = (description) => {
    return description.replace(/(\d+\.)/g, "\n$1").trim();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-6 relative"
      style={{ backgroundImage: `url('/maize_bg.jpg')`, backgroundSize: "cover" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-0"></div>

      <div className="mt-24 relative z-10">
        <h1 className="text-2xl md:text-4xl font-bold mb-3 text-center text-white font-montserrat">
          Hybrid {crop.cropName} Variants
        </h1>
      </div>

      {selectedVariety && varietyDesc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black bg-opacity-75"
        >
          <motion.div
            className="bg-black bg-opacity-40 border-4 border-black backdrop-blur-sm rounded-lg p-4 relative w-full max-w-6xl  sm:h-[85vh] md:h-[75vh] lg:h-[65vh] flex flex-col lg:flex-row justify-between overflow-y-auto"
            layoutId={`variety-${selectedVariety}`}
          >
            <div className="w-full lg:w-1/3 flex flex-col items-center justify-center md:h-3/5 lg:h-full">
              <img
                src={varietyDesc?.img || "/placeholder.jpg"}
                alt={selectedVariety}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-2/3 flex flex-col items-center justify-center lg:px-4 text-center md:p-2 lg:p-4"
            >
              <h2 className="lg:text-2xl md:text-xl text-lg text-white font-bold mb-4">
                {varietyDesc.varietyName}
              </h2>
              <p className="text-[0.85rem] text-justify md:text-base text-gray-300 whitespace-pre-line leading-relaxed">
                {formatDescription(varietyDesc.description)}
              </p>
            </motion.div>

            <button
              className="absolute top-4 right-4 cursor-pointer rounded-full bg-red-500 p-2"
              onClick={handleClose}
            >
              <AiOutlineClose size={24} className="text-white" />
            </button>
          </motion.div>
        </motion.div>
      )}

      <div className="flex flex-wrap gap-4 mt-4 z-10">
        <ProductsButton
          label="Field Videos"
          type="video"
          onClick={handleFieldVideoClick}
        />
        <ProductsButton
          label="Handout"
          type="handout"
          onClick={handleHandoutClick}
        />
      </div>

      <motion.div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-24 gap-y-8 mt-10 relative z-10 ${
          selectedVariety ? "flex justify-center" : ""
        }`}
      >
        {crop.varieties.map((variety, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleSelect(variety)}
            layoutId={`variety-${variety}`}
          >
            <motion.img
              src={
                VarietyDescription.find((v) => v.varietyName === variety)?.img ||
                "/placeholder.jpg"
              }
              alt={variety}
              className="w-64 h-64 object-cover rounded-lg border-8 border-white border-opacity-50  shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <p className="mt-2 text-white text-lg font-semibold">{variety}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}