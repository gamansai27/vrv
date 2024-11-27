import Image from "next/image";
import HeroSection1 from "./_components/HeroSection1";
import Navbar from "./_components/Navbar";
import HeroSection2 from "./_components/HeroSection2";
import BentoGrid from "./_components/BentoGrid";


export default function Home() {
  return (
    <>
      
      <HeroSection1/>
      {/* <HeroSection2 /> */}
      <BentoGrid/>

    </> 
  );
}
