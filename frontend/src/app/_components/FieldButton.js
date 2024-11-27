import React from 'react';
import { TvMinimalPlayIcon } from 'lucide-react';

const FieldButton = ({ text }) => {
  return ( 
    <button
      type="submit"
      className="flex justify-between gap-6 items-center mx-auto shadow-xl text-slate-700 text-[1.75rem] bg-slate-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group w-80 hover:scale-110 transition duration-200 bg-opacity-70"
    >
      {text}
      <div className="justify-center items-stretch w-10 h-10 rounded-full border-2 border-red-600 group-hover:bg-red-600 group-hover:border-none transition ease-linear duration-300 p-[0.375rem]">
          <TvMinimalPlayIcon
            className="w-full h-full text-red-600 group-hover:text-white transform transition ease-linear duration-300"
          />
      </div>
    </button>
  );
};

export default FieldButton;
