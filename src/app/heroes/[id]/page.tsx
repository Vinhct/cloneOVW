'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Character, charactersApi } from '@/data/characters';
import { motion, AnimatePresence } from 'framer-motion';
import ParticlesEffect from '@/components/effects/ParticlesEffect';
import NeonGlowEffect from '@/components/effects/NeonGlowEffect';
import BackgroundEffect from '@/components/effects/BackgroundEffect';
import { useState, useEffect } from 'react';

export default function HeroDetail({ params }: { params: { id: string } }) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setIsLoading(true);
        const lowercaseId = params.id.toLowerCase();
        console.log('Fetching character with ID:', lowercaseId);
        
        // Sử dụng API trực tiếp thay vì gọi charactersApi
        const response = await fetch(`/api/heroes/${lowercaseId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Character data received:', data);
        
        if (!data) {
          notFound();
        }
        
        setCharacter(data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch character:', error);
        setError('Failed to load character data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-4xl font-bold text-white mb-4">
            LOADING HERO
          </div>
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-overwatch-blue"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5 }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-white mb-6">Character not found</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-overwatch-blue text-white rounded hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <Link href="/heroes">
              <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
                Back to Heroes
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Role colors mapping
  const roleColors: Record<string, string> = {
    'Tank': '#3C7DFF',
    'Damage': '#FF5C5C',
    'Support': '#44CC55',
    'Duelist': '#FF9E4C',
    'Sentinel': '#33AACC',
    'Controller': '#8C5EFF',
    'Initiator': '#FFD24C'
  };

  const primaryColor = roleColors[character.role] || '#ff4655';

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <ParticlesEffect count={20} color={primaryColor} />
      <BackgroundEffect primaryColor={primaryColor} secondaryColor="#000" speed={0.5} density={15} />
      
      {/* Hero Banner */}
      <div 
        className="relative h-[60vh] overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, ${primaryColor}, ${character.backgroundGradient[1]})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-10" />
        <Image 
          src={character.background || character.fullPortrait} 
          alt={character.name} 
          fill 
          className="object-cover opacity-40"
          priority
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 h-full flex items-end pb-12 relative z-20"
        >
          <div className="flex flex-col md:flex-row items-end gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-32 h-32 md:w-48 md:h-48 relative rounded-full overflow-hidden border-4 border-white/20 shadow-lg shadow-black/50"
            >
              <Image
                src={character.bustPortrait}
                alt={character.name}
                fill
                className="object-cover"
              />
            </motion.div>
            <div>
              <NeonGlowEffect primaryColor={primaryColor}>
                <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">{character.name}</h1>
              </NeonGlowEffect>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center mt-2">
                  <div className="px-3 py-1 rounded-full bg-gray-800/80 text-sm uppercase tracking-wider">
                    {character.role}
                  </div>
                  {character.difficulty !== undefined && (
                    <div className="ml-4 flex items-center">
                      <span className="text-xs text-gray-400 mr-2">Difficulty:</span>
                      <div className="flex">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div 
                            key={i}
                            className={`w-2 h-2 rounded-full mr-1 ${
                              character.difficulty && i < character.difficulty ? 'bg-overwatch-blue' : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {character.quote && (
                  <p className="text-lg italic mt-4 text-gray-300 border-l-4 border-overwatch-blue pl-4">"{character.quote}"</p>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
          {/* Left Column - Bio and Abilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Biography */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -left-5 top-0 bottom-0 w-1 bg-gradient-to-b from-overwatch-blue to-transparent"></div>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <span className="text-overwatch-blue mr-2">#</span> Biography
              </h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-lg leading-relaxed">{character.biography}</p>
              </div>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700 hover:border-overwatch-blue transition-colors"
                >
                  <h3 className="text-sm text-gray-400 mb-1">Origin</h3>
                  <p className="font-medium">{character.origin}</p>
                </motion.div>
                {character.releaseDate && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700 hover:border-overwatch-blue transition-colors"
                  >
                    <h3 className="text-sm text-gray-400 mb-1">Release Date</h3>
                    <p className="font-medium">{character.releaseDate}</p>
                  </motion.div>
                )}
                {character.age && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700 hover:border-overwatch-blue transition-colors"
                  >
                    <h3 className="text-sm text-gray-400 mb-1">Age</h3>
                    <p className="font-medium">{character.age}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
            
            {/* Abilities */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-8 flex items-center">
                <span className="text-overwatch-blue mr-2">#</span> Abilities
              </h2>
              
              {/* Ability Navigation */}
              <div className="flex overflow-x-auto pb-4 mb-6 scrollbar-hide">
                {character.abilities.map((ability, index) => (
                  <motion.button
                    key={ability.name}
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-shrink-0 mr-3 px-4 py-3 rounded-lg flex items-center bg-gray-800 hover:bg-gray-700 text-gray-300 transition-all duration-300`}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 bg-gray-900`}>
                      <span className="font-bold">{ability.key}</span>
                    </div>
                    <span className="font-medium">{ability.name}</span>
                  </motion.button>
                ))}
              </div>
              
              {/* Ability Details */}
              <div className="space-y-6">
                {character.abilities.map((ability, index) => (
                  <motion.div
                    key={ability.name}
                    initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className={`bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 hover:bg-gray-700/70 transition-colors border border-gray-700`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-gray-900 rounded-lg p-3 flex-shrink-0">
                        <span className="text-overwatch-blue font-bold">{ability.key}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{ability.name}</h3>
                        <p className="text-gray-300 mt-2 leading-relaxed">{ability.description}</p>
                        
                        {/* Ability Details */}
                        {ability.cooldown && (
                          <div className="mt-4 inline-block px-3 py-1 bg-gray-900 rounded-full text-sm">
                            Cooldown: {ability.cooldown}s
                          </div>
                        )}
                      </div>
                    </div>
                    {ability.video && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 aspect-video relative rounded-lg overflow-hidden border border-gray-600"
                      >
                        <video
                          src={ability.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Stats and Related Heroes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Hero Portrait */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl shadow-black/30"
            >
              <Image
                src={character.fullPortrait}
                alt={character.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Character Stats */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <div className="space-y-4">
                  {character.age && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Age:</span>
                      <span className="font-medium">{character.age}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Origin:</span>
                    <span className="font-medium">{character.origin}</span>
                  </div>
                  
                  {character.difficulty && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Difficulty:</span>
                      <div className="flex">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div 
                            key={i}
                            className={`w-3 h-3 rounded-full mx-1 ${
                              i < character.difficulty! ? 'bg-overwatch-blue' : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {character.cooldown && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Cooldown:</span>
                      <span className="font-medium">{character.cooldown}s</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
            
            {/* Stats */}
            {(character.health || character.armor || character.shield) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="text-overwatch-blue mr-2">#</span> Stats
                </h2>
                <div className="space-y-6">
                  {character.health && (
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300 font-medium">Health</span>
                        <span className="font-bold">{character.health}</span>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, character.health / 3)}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="bg-green-500 h-3 rounded-full" 
                        />
                      </div>
                    </div>
                  )}
                  
                  {character.armor && (
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300 font-medium">Armor</span>
                        <span className="font-bold">{character.armor}</span>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, character.armor / 3)}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="bg-yellow-500 h-3 rounded-full" 
                        />
                      </div>
                    </div>
                  )}
                  
                  {character.shield && (
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300 font-medium">Shield</span>
                        <span className="font-bold">{character.shield}</span>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, character.shield / 3)}%` }}
                          transition={{ duration: 1, delay: 0.4 }}
                          className="bg-blue-500 h-3 rounded-full" 
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            {/* Developer Notes */}
            {character.developerNotes && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="text-overwatch-blue mr-2">#</span> Developer Notes
                </h2>
                <p className="text-gray-300 italic">{character.developerNotes}</p>
              </motion.div>
            )}
            
            {/* Back to Heroes */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link 
                href="/heroes" 
                className="inline-block bg-gradient-to-r from-overwatch-blue to-blue-600 hover:from-overwatch-blue hover:to-blue-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:-translate-y-1"
              >
                ← Back to Heroes
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
