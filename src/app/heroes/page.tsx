'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { charactersApi } from '@/data/characters';
import ParticlesEffect from '@/components/effects/ParticlesEffect';
import GlitchEffect from '@/components/effects/GlitchEffect';
import NeonGlowEffect from '@/components/effects/NeonGlowEffect';

export default function Heroes() {
  const allCharacters = charactersApi.getAllCharacters();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredCharacters = allCharacters
    .filter(char => selectedRole ? char.role === selectedRole : true)
    .filter(char => char.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const roles = Array.from(new Set(allCharacters.map(char => char.role)));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -15,
      scale: 1.05,
      boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3)",
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.95,
      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.1
      }
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <GlitchEffect text="LOADING HEROES" className="text-4xl font-bold text-white mb-4" />
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-overwatch-blue"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Particles effect với z-index thấp hơn */}
      <div className="absolute inset-0 z-0">
        <ParticlesEffect />
      </div>
      
      {/* Hero Banner */}
      <div className="relative h-[40vh] overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-10" />
        <Image 
          src="/images/heroes-banner.png" 
          alt="Heroes Banner" 
          fill 
          className="object-cover opacity-50"
          priority
        />
        <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlitchEffect text="HEROES OVERVIEW" className="text-5xl md:text-7xl font-bold text-center mb-4" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-center text-gray-300 max-w-3xl"
          >
            Explore our roster of powerful heroes with unique abilities and playstyles
          </motion.p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            <NeonGlowEffect primaryColor="#ff4655" intensity={5}>
              HEROES
            </NeonGlowEffect>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Choose your hero and join the battle. Each hero has unique abilities and playstyles.
          </motion.p>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex-grow"
          >
            <input
              type="text"
              placeholder="Search heroes by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border-2 border-gray-700 focus:border-overwatch-blue rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none transition-colors"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedRole(null)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedRole === null 
                  ? 'bg-gradient-to-r from-overwatch-blue to-blue-500 shadow-lg shadow-blue-500/20' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              All
            </motion.button>
            
            {roles.map((role) => (
              <motion.button
                key={role}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300`}
                style={{
                  background: selectedRole === role 
                    ? `linear-gradient(to right, ${roleColors[role] || '#ff4655'}, ${roleColors[role] || '#ff4655'}88)` 
                    : 'rgb(31, 41, 55)', // bg-gray-800
                  boxShadow: selectedRole === role ? `0 10px 15px ${roleColors[role]}30` : 'none'
                }}
              >
                {role}
              </motion.button>
            ))}
          </motion.div>
        </div>
        
        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 text-gray-300"
        >
          Showing {filteredCharacters.length} {filteredCharacters.length === 1 ? 'hero' : 'heroes'}
          {selectedRole && ` in ${selectedRole} role`}
          {searchQuery && ` matching "${searchQuery}"`}
        </motion.div>
        
        {/* Characters Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <AnimatePresence>
            {filteredCharacters.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <div className="text-4xl font-bold mb-4 text-gray-500">No Heroes Found</div>
                <p className="text-gray-400">Try adjusting your search or filter criteria</p>
              </motion.div>
            ) : (
              filteredCharacters.map((character, index) => (
                <motion.div
                  key={character.id}
                  custom={index}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="relative cursor-pointer"
                  onMouseEnter={() => setHoveredCharacter(character.id)}
                  onMouseLeave={() => setHoveredCharacter(null)}
                >
                  <a href={`/heroes/${character.id.toLowerCase()}`} className="block">
                    <div className="block">
                      <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 group">
                        <Image
                          src={character.fullPortrait}
                          alt={character.name}
                          fill
                          className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                        {/* Role Badge */}
                        <div 
                          className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs uppercase tracking-wider"
                          style={{
                            background: `linear-gradient(to right, ${roleColors[character.role] || '#ff4655'}, ${roleColors[character.role] || '#ff4655'}88)`,
                            boxShadow: hoveredCharacter === character.id ? `0 0 15px ${roleColors[character.role] || '#ff4655'}` : 'none',
                            transition: 'box-shadow 0.3s ease'
                          }}
                        >
                          {character.role}
                        </div>
                        
                        {/* Character Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <NeonGlowEffect primaryColor={roleColors[character.role] || '#ff4655'} intensity={3}>
                            <h3 className="text-xl font-bold mb-1 group-hover:text-white transition-colors">
                              {character.name}
                            </h3>
                          </NeonGlowEffect>
                          
                          {/* Difficulty Indicator */}
                          {character.difficulty && (
                            <div className="flex items-center mt-2">
                              <span className="text-xs text-gray-400 mr-2">Difficulty:</span>
                              <div className="flex">
                                {Array.from({ length: 3 }).map((_, i) => (
                                  <div 
                                    key={i}
                                    className={`w-2 h-2 rounded-full mr-1 ${
                                      i < character.difficulty! ? 'bg-overwatch-blue' : 'bg-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Hover Effect */}
                          <div className="mt-3 h-0 overflow-hidden group-hover:h-auto transition-all duration-300">
                            <p className="text-sm text-gray-300 line-clamp-2">{character.biography.substring(0, 100)}...</p>
                            <div className="mt-3 inline-block px-3 py-1 bg-overwatch-blue rounded-full text-sm font-medium">
                              View Details
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
