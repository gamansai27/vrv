"use client";

import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
  
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // Assuming 'lg:' starts at 1024px
        setIsOpen(false); // Close the menu if on a larger screen
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize); // Listen for screen resizing
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize); // Clean up
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const staggeredLinks = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  }

  const linkVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  }

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Products', href: '/crops' },
    { name: 'Recent Updates', href: '/updates' },
    { name: 'Field Videos', href: '/fielddays' },
    { name: 'Handouts', href: '/handouts' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Loyalty Rewards', href: '/rewards'},
    { name: 'Contact Us', href: '/contact' },
    // { name: 'Employee Login', href: '/employee' }
  ]


  const userNavItems = [
    { name: "Announcements", href: "/employee/announcements" },
    { name: "Organisation Structure", href: "#" },
    { name: "Brochures", href: "#" },
    { name: "Policy Documents", href: "#" },
    { name: "Guides and Forms", href: "#" },
    { name: "Loyalty Points", href: "#" },
    { name: "Score Card", href: "/#" },
    { name: "My Profile", href: "/employee/profile" },
    // { name: "Dashboard", href: "/employee/dashboard" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen)

  const isEmployeePage = pathname.startsWith('/employee');
  const isHomePage = pathname === '/';

  return (
    <div className="relative z-50">
      {/* Navbar */}
      <nav className={`fixed top-2 left-2 right-2 bg-white/80  border border-black transition-all duration-300 rounded-full  ${isScrolled ? 'h-10' : 'h-16'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full ">
          <div className={`flex items-center justify-between ${isScrolled ? 'h-10' : 'h-16'} w-full transition-all duration-300`}>
            <div className="flex-shrink-0 ml-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Sheena Seeds Logo"
                  width={isScrolled ? 50 : 80}
                  height={isScrolled ? 50 : 80}
                  className="transition-all duration-300"
                />
              </Link>
            </div>

             {/* Hamburger Menu Button for Small and Medium Screens */}
              <button
              className="lg:hidden block text-black focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className={`block w-8 h-1 bg-black rounded-sm transform transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-8 h-1 bg-black rounded-sm my-1 transform transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-8 h-1 bg-black rounded-sm transform transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>

            {/* Navbar Links for Large Screens */}
            <div className="hidden lg:flex lg:items-center lg:justify-end lg:flex-1 lg:w-0">
              <div className={`flex ${isAuthenticated ? 'space-x-4' : 'space-x-8'} ${isScrolled ? 'text-sm' : 'text-[1.1rem]'} transition-all duration-300`}>
                {isEmployeePage && isAuthenticated ? (
                  <>
                    <Link href="/employee/announcements" className="text-black hover:underline hover:text-gray-600">Announcements</Link>
                    <Link href="/organisation-structure" className="text-black hover:underline hover:text-gray-600">Organisation Structure</Link>
                    <Link href="/brochures" className="text-black hover:underline hover:text-gray-600">Brochures</Link>
                    <Link href="/policydoc" className="text-black hover:underline hover:text-gray-600">Policy Documents</Link>
                    <Link href="/guides-forms" className="text-black hover:underline hover:text-gray-600">Guides and Forms</Link>
                    <Link href="/loyalty-points" className="text-black hover:underline hover:text-gray-600">Loyalty Points</Link>
                    <Link href="/scorecard" className="text-black hover:underline hover:text-gray-600">Score Card</Link>
                    <Link href="/employee/profile" className="text-black hover:underline hover:text-gray-600">My Profile</Link>
                    <Link href="/employee/dashboard" className="text-black hover:underline hover:text-gray-600">Dashboard</Link>
                  </>
                ) : (
                  <>
                    <Link href="/about" className="text-black hover:underline hover:text-gray-600">About Us</Link>
                    <Link href="/crops" className="text-black hover:underline hover:text-gray-600">Products</Link>
                    <Link href="/updates" className="text-black hover:underline hover:text-gray-600">Recent Updates</Link>
                    <Link href="/fielddays" className="text-black hover:underline hover:text-gray-600">Field Videos</Link>
                    <Link href="/handouts" className="text-black hover:underline hover:text-gray-600">Handouts</Link>
                    <Link href="/gallery" className="text-black hover:underline hover:text-gray-600">Gallery</Link>
                    <Link href="/rewards" className="text-black hover:underline hover:text-gray-600">Loyalty Rewards</Link>
                    <Link href="/contact" className="text-black hover:underline hover:text-gray-600">Contact Us</Link>
                    {!isHomePage && isAuthenticated && (
                      <Link href="/employee/dashboard" className="text-black hover:underline hover:text-gray-600">Dashboard</Link>
                    )}
                  </>
                )}
              </div>

              {/* Employee Login/Logout or Dashboard Button */}
              <div className="ml-10">
                {isAuthenticated ? (
                  isHomePage ? (
                    <Link href="/employee/dashboard">
                      <button className="bg-blue-500 text-white font-semibold py-1 px-3 rounded transition duration-300">
                        Dashboard
                      </button>
                    </Link>
                  ) : (
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-300 text-white py-1 px-3 rounded transition duration-300">
                      Logout
                    </button>
                  )
                ) : (
                  <Link href="/employee">
                    <button className="bg-blue-500 hover:bg-blue-300 text-white py-1 px-3 rounded transition duration-300">
                      Employee Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed right-0 top-[4.5rem] w-full bg-white shadow-lg z-40 rounded-xl"
            >
              <nav className="flex flex-col h-full justify-center">
                <motion.ul variants={staggeredLinks} className="space-y-4 p-4">
                  {/* Render Common Menu Items */}
                  {(isEmployeePage && isAuthenticated ? userNavItems : navItems).map((item) => (
                    <motion.li key={item.name} variants={linkVariants}>
                      <Link
                        href={item.href}
                        className="text-black text-med hover:underline transition-colors duration-200"
                        onClick={toggleSidebar}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}

                  {/* Conditional Rendering for Authenticated Users */}
                  {isAuthenticated ? (
                    <>
                      {/* Dashboard Button */}
                      <motion.li variants={linkVariants}>
                        <Link
                          href="/employee/dashboard"
                          className="text-black text-med font-semibold hover:underline transition-colors duration-200"
                          onClick={toggleSidebar}
                        >
                          Dashboard
                        </Link>
                      </motion.li>

                      {/* Logout Button */}
                      <motion.li variants={linkVariants}>
                        <button
                          onClick={handleLogout}
                          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-400 transition-colors duration-300"
                        >
                          Logout
                        </button>
                      </motion.li>
                    </>
                  ) : (
                    /* Employee Login Button for Unauthenticated Users */
                    <motion.li variants={linkVariants}>
                      <Link
                        href="/employee"
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-400 transition-colors duration-300"
                        onClick={toggleSidebar}
                      >
                        Employee Login
                      </Link>
                    </motion.li>
                  )}
                </motion.ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
