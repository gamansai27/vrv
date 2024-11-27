"use client";
import { ChevronDown} from 'lucide-react';
import FieldButton from '../_components/FieldButton';

const crops = [
  "Chilli", "Maize", "Watermelon", "Bhendi", "Potatoes",
  "Cucumber", "Tomato", "Hybrid Paddy", "Research Paddy", "Bitter Gourd",
];

export default function Fieldvideos() {
  return (
    <div className="relative min-h-screen w-full p-8 bg-cover bg-center">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-[url('/fieldvidsbg.jpg')] bg-cover bg-center filter bg-black bg-opacity-50"
        style={{ zIndex: -1 }}
      ></div>
      <div className="max-w-6xl mx-auto relative z-10 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-6xl font-bold text-green-900 text-center">
            Field Videos
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-green-900/75 text-center mb-8">
            Select Crops
          </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-transparent">
          {crops.map((crop, index) => (
            <FieldButton key={index} text={crop} />
          ))}
        </div>
      </div>
    </div>
  );
}
