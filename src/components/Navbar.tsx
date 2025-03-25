"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 h-[80px] z-50 transition-all duration-300 ${
        isScrolled ? "bg-overwatch-blue-dark/95 backdrop-blur-sm" : "bg-overwatch-blue-dark/80"
      }`}
    >
      <div className="h-full mx-auto px-4">
        <div className="flex items-center justify-between h-full">
          {/* Left side - Logo */}
          <Link href="/" className="relative z-40 flex-shrink-0">
            <div className="flex items-center">
              <Image 
                src="/images/valorant-logo.svg" 
                alt="Overwatch" 
                width={40} 
                height={40}
                className="w-auto h-[40px] filter brightness-0 invert"
              />
              <span className="ml-2 text-white font-bold text-xl uppercase tracking-wider">Overwatch</span>
            </div>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center">
              <li className="group relative">
                <Link 
                  href="/game-info" 
                  className="block px-4 py-8 font-sans uppercase text-[14px] text-white hover:text-overwatch-blue tracking-widest transition-colors flex items-center"
                >
                  GAME INFO
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 w-3 h-3">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </Link>
              </li>

              <li>
                <Link 
                  href="/heroes" 
                  className="block px-4 py-8 font-sans uppercase text-[14px] text-white hover:text-overwatch-blue tracking-widest transition-colors"
                >
                  HEROES
                </Link>
              </li>
              
              <li>
                <Link 
                  href="/news" 
                  className="block px-4 py-8 font-sans uppercase text-[14px] text-white hover:text-overwatch-blue tracking-widest transition-colors"
                >
                  NEWS
                </Link>
              </li>

              <li className="group relative">
                <Link 
                  href="/support" 
                  className="block px-4 py-8 font-sans uppercase text-[14px] text-white hover:text-overwatch-blue tracking-widest transition-colors flex items-center"
                >
                  SUPPORT
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 w-3 h-3">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </Link>
              </li>

              <li className="group relative">
                <Link 
                  href="/our-socials" 
                  className="block px-4 py-8 font-sans uppercase text-[14px] text-white hover:text-overwatch-blue tracking-widest transition-colors flex items-center"
                >
                  OUR SOCIALS
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 w-3 h-3">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </Link>
              </li>

           
            </ul>
          </nav>

          {/* Right side - Search and Play Button */}
          <div className="flex items-center gap-x-6">
            <button className="text-white hover:text-overwatch-blue transition-colors p-2">
              <Search className="h-5 w-5" />
            </button>
            <Link 
              href="/download"
              className="hidden lg:inline-flex bg-overwatch-blue hover:bg-overwatch-blue/90 transition-colors text-white uppercase text-[14px] tracking-widest px-8 py-2 rounded-md font-bold shadow-md"
            >
              PLAY NOW
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden inline-flex items-center justify-center p-2 text-white hover:text-overwatch-blue transition-colors relative z-40"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-overwatch-blue-dark transition-all duration-300 ease-in-out z-30 ${
            isMenuOpen
              ? "opacity-100 translate-y-[80px]"
              : "opacity-0 -translate-y-full pointer-events-none"
          }`}
        >
          <nav className="px-4 py-6">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/game-info"
                  className="font-sans uppercase text-[14px] text-white hover:text-overwatch-blue tracking-widest transition-colors block py-3"
                >
                  GAME INFO
                </Link>
              </li>
              <li>
                <Link
                  href="/heroes"
                  className="font-sans uppercase text-[14px] text-white hover:text-overwatch-blue tracking-widest transition-colors block py-3"
                >
                  HEROES
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="font-sans uppercase text-[14px] text-white hover:text-overwatch-blue tracking-widest transition-colors block py-3"
                >
                  NEWS
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="font-sans uppercase text-[14px] text-white hover:text-overwatch-blue tracking-widest transition-colors block py-3"
                >
                  SUPPORT
                </Link>
              </li>
              <li>
                <Link
                  href="/our-socials"
                  className="font-sans uppercase text-[14px] text-white hover:text-overwatch-blue tracking-widest transition-colors block py-3"
                >
                  OUR SOCIALS
                </Link>
              </li>
              <li>
                <Link
                  href="/esports"
                  className="font-sans uppercase text-[14px] text-white hover:text-overwatch-blue tracking-widest transition-colors block py-3"
                >
                  ESPORTS
                </Link>
              </li>
              <li className="pt-4">
                <Link
                  href="/download"
                  className="inline-flex bg-overwatch-blue hover:bg-overwatch-blue/90 transition-colors text-white uppercase text-[14px] tracking-widest px-8 py-3 rounded-md font-bold shadow-md"
                >
                  PLAY NOW
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
