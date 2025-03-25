"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import NewsSection from "@/components/NewsSection";
import AboutSection from "@/components/AboutSection";
import AgentsSection from "@/components/AgentsSection";
import MapsSection from "@/components/MapsSection";
import LoadingScreen from "@/components/LoadingScreen";
import ParticleBackground from "@/components/ui/ParticleBackground";
import ScrollReveal from "@/components/ui/ScrollReveal";
import FPSCursor from "@/components/ui/FPSCursor";
import BulletHoles from "@/components/ui/BulletHoles";
import VisualEffects from "@/components/effects/VisualEffects";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Custom Mouse Effects */}
      {!isLoading && (
        <>
          <FPSCursor />
          <BulletHoles 
            maxHoles={10}
            holeLifetime={5000}
            holeSize={20}
          />
          <VisualEffects 
            enableParallax={true}
            enableGlitch={true}
            enableNeonGlow={true}
            enableParticles={true}
            enableScanLine={true}
            enablePageTransition={true}
            enableAmbientSound={true}
            pageTransitionType="glitch"
            ambientSoundVolume={0.15}
          />
        </>
      )}

      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />

      {/* Background Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <ParticleBackground 
          particleCount={30}
          connectParticles={true}
        />
      </div>

      {/* Main Content */}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <HeroSection />
        
        <ScrollReveal 
          direction="up" 
          threshold={0.1} 
          delay={100} 
          distance={50}
        >
          <AboutSection />
        </ScrollReveal>
        
        <ScrollReveal 
          direction="up" 
          threshold={0.1} 
          delay={100} 
          distance={50}
        >
          <AgentsSection />
        </ScrollReveal>
        
        <ScrollReveal 
          direction="up" 
          threshold={0.1} 
          delay={100} 
          distance={50}
        >
          <MapsSection />
        </ScrollReveal>
        
        <ScrollReveal 
          direction="up" 
          threshold={0.1} 
          delay={100} 
          distance={50}
        >
          <NewsSection />
        </ScrollReveal>
      </div>
    </div>
  );
}
