"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state after component mounts
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax effect values
  const backgroundY = scrollY * 0.5;
  const titleY = scrollY * 0.2;
  const subtitleY = scrollY * 0.3;

  return (
    <section className="relative w-full overflow-hidden min-h-screen">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ transform: `translateY(${backgroundY}px)` }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt="Overwatch Hero Background"
          fill
          className="object-cover object-center"
          priority
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 bg-overwatch-blue-dark/50 mix-blend-multiply"></div>
        
        {/* Overlay geometric shapes - Overwatch style */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border-4 border-primary-blue/30 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 border-2 border-secondary-blue/20 rounded-full opacity-30 animate-ping" style={{animationDuration: '3s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-accent-orange/10 rounded-full blur-xl animate-pulse" style={{animationDuration: '4s'}}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative h-screen flex items-center">
        <div 
          className={`valorant-container z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transform: `translateY(${titleY}px)` }}
        >
          <h1 className="overwatch-heading text-6xl md:text-7xl lg:text-8xl mb-4 text-white drop-shadow-lg">
            OVERWATCH <span className="text-primary-blue">WORLD</span>
          </h1>
          <div 
            className="max-w-xl transition-all duration-1000 delay-300"
            style={{ transform: `translateY(${subtitleY}px)` }}
          >
            <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md">
              Tham gia cùng các anh hùng từ khắp nơi trên thế giới. Chiến đấu cho tương lai trong các trận chiến đội hình 5v5 đầy kịch tính.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/game-info" className="overwatch-btn-primary transform hover:scale-105 transition-transform">
                TÌM HIỂU THÊM
              </Link>
              <button className="overwatch-btn-secondary transform hover:scale-105 transition-transform">
                CHƠI NGAY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 ${scrollY > 50 ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-white text-sm mb-2">CUỘN XUỐNG</span>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
