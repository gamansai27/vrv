"use client";
import Link from 'next/link';
import cropVariety from '../../../public/crops';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Crops() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCrops, setFilteredCrops] = useState(cropVariety.all);
    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const footer = document.querySelector('footer');
            const footerTop = footer?.getBoundingClientRect().top;

            // Check if we're approaching the footer
            if (footerTop && footerTop <= windowHeight) {
                setIsAtBottom(true);
            } else {
                setIsAtBottom(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = cropVariety.all.filter(crop => {
            const cropMatches = crop.cropName.toLowerCase().includes(query);
            const varietyMatches = crop.varieties?.some(variety => 
                variety.toLowerCase().includes(query)
            );
            return cropMatches || varietyMatches;
        });

        setFilteredCrops(filtered);
    };

    return (
        <div className="min-h-screen  w-full relative bg-green-200">
            {/* Fixed Hero Section */}
            <div className={`${isAtBottom ? 'absolute' : 'fixed'} top-0 left-0 w-full h-[45vh] z-0`}>
                <Image
                    src="/veggies.jpg"
                    fill
                    alt="Background image"
                    style={{ objectFit: 'cover' }}
                    priority
                    className="absolute inset-0 w-full h-full brightness-50" // Darkened image
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-200 bg-opacity-10">
                    <h1 className="text-3xl text-center md:text-6xl font-extrabold text-white z-10">
                        OUR PRODUCTS
                    </h1>
                    <div className="relative mt-6">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search crops or varieties..."
                            className="border pl-4 pr-2 py-2 rounded-full text-black placeholder:text-black/70 placeholder:text-center bg-white bg-opacity-50 border-white w-64"
                            style={{ outline: "none", textIndent: "0.5rem" }} // Adds a tab-like space
                        />
                    </div>
                </div>
            </div>

            {/* Spacer div to prevent content from appearing under fixed hero */}
            <div style={{ height: '45vh' }} aria-hidden="true"></div>

            {/* Main Content */}
            <main className="relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 lg:px-24 py-10 bg-green-200">
                {filteredCrops.map((crop) => (
                    <Link href={crop.url} key={crop.id}>
                        <div
                            className={`crop-container relative w-full h-0 pb-[70%] overflow-hidden shadow-lg border border-transparent rounded-lg transition-all duration-500 ease-in-out cursor-pointer transform-gpu hover:scale-105 ${
                                searchQuery && crop.varieties.some(variety => variety.toLowerCase().includes(searchQuery))
                                    ? 'border-4 border-yellow-500'
                                    : ''
                            }`}
                        >
                            <Image
                                src={crop.img}
                                alt={crop.cropName}
                                width={500}
                                height={300}
                                className="crop-image absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 ease-in-out rounded-lg brightness-75"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 rounded-b-lg">
                                <h2 className="text-white text-xl font-bold text-center">{crop.cropName}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </main>

            <style jsx>{`
                .crop-image {
                    filter: brightness(0.75); /* Darkens the images */
                    transition: filter 0.5s ease;
                }

                main:hover .crop-container:not(:hover) .crop-image {
                    filter: brightness(0.6); /* Further darken when not hovered */
                }
            `}</style>
        </div>
    );
}