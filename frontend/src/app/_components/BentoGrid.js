"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection2 from "./HeroSection2";
import { InfiniteMovingCardsDemo } from "./MarqueeProducts";

const containerVariants = {
  hidden: { opacity: 0.5 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.25,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, x: 20 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function BentoGrid() {

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* BentoGrid Content */}
      
      <motion.div
        className="relative min-h-screen grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 w-full mx-auto pb-2 md:py-3 px-2 md:px-6 rounded-md mt-4 grid-flow-dense"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        {/*Top 6 grid elements */}
        <motion.div
            key={3}
            variants={itemVariants}
            className="bg-gray-500 rounded-md relative min-h-64 md:min-h-[22rem] grid-flow-dense"
          >
            <p className="text-white font-bold text-center p-4">
              Quick links
            </p>
          </motion.div>
          <motion.div
            key={4}
            variants={itemVariants}
            className="bg-gray-500 rounded-md relative min-h-64 md:min-h-[22rem] grid-flow-dense col-span-2 "
          >
            <HeroSection2></HeroSection2>
          </motion.div>
        <motion.div
            key={1}
            variants={itemVariants}
            className="bg-gradient-to-b from-green-600 to-blue-500 rounded-md relative min-h-64 md:min-h-[22rem] grid-flow-dense col-span-2 "
          >
            {/* <p className="text-white font-bold text-center p-4">
              Grid Item 3
            </p> */}
            <InfiniteMovingCardsDemo></InfiniteMovingCardsDemo>
          </motion.div>
          <motion.div
            key={2}
            variants={itemVariants}
            className="bg-gray-500 rounded-md relative min-h-64 md:min-h-[22rem] grid-flow-dense"
          >
            <p className="text-white font-bold text-center p-4">
              Grid Item 4
            </p>
          </motion.div>
          
          <motion.div
            key={5}
            variants={itemVariants}
            className="bg-gray-500 rounded-md relative min-h-64 md:min-h-[22rem] grid-flow-dense"
          >
            <p className="text-white font-bold text-center p-4">
              Grid Item 5
            </p>
          </motion.div>
          <motion.div
            key={6}
            variants={itemVariants}
            className="bg-gray-500 rounded-md relative min-h-64 md:min-h-[22rem] grid-flow-dense col-span-2 "
          >
            <p className="text-white font-bold text-center p-4">
              Grid Item 6
            </p>
          </motion.div>
        {/*3 same size grid elements */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-500 rounded-md relative min-h-64 md:min-h-[22rem] grid-flow-dense group overflow-hidden"
        >
          <p className="text-white font-bold text-center p-4">Custom Content 7</p>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-center font-bold text-lg">Overlay for Item 7</p>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gray-500 rounded-md relative min-h-64 md:min-h-[22rem] grid-flow-dense group overflow-hidden"
        >
          <p className="text-white font-bold text-center p-4">Custom Content 8</p>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-center font-bold text-lg">Overlay for Item 8</p>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gray-500 rounded-md relative min-h-64 md:min-h-[22rem] grid-flow-dense group overflow-hidden"
        >
          <p className="text-white font-bold text-center p-4">Custom Content 9</p>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-center font-bold text-lg">Overlay for Item 9</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
