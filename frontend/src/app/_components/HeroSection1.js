"use client"
import { motion } from 'framer-motion';
export default function HeroSection1(){
    return(
        <>
        
        <div className="overflow-hidden h-screen w-full">
        <motion.div
        initial={{scale:2}}
        animate={{scale:1}}
        transition={{duration:2}}
        className="fixed inset-0 w-full h-screen bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/bgn.jpg')" }}
      ></motion.div>
        <motion.div 
    className="flex h-full w-full  justify-center lg:justify-end xl:justify-end items-center overflow-hidden"
    initial={{scale:2}}
    animate={{scale:1}}
    transition={{duration:2}}
    >
            <motion.h1 className="text-black font-myFont text-7xl md:text-8xl lg:text-9xl xl:text-11xl lg:mr-[4rem] xl:mr-[4rem] lg:mb-[6.5rem] xl:mb-[6.5rem] md:mb-11 mb-8  "
            initial={{opacity:0 ,x:-100, backgroundSize:"200%"}}
            animate={{opacity:1,x:0,  backgroundSize:"100%"}}
            transition={{duration:2}}
            >Sheena Seeds</motion.h1>
        </motion.div>
        </div>
        </>
    );
}