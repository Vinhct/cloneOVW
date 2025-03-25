"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type NewsItem = {
  id: string;
  date: string;
  category: "Game Updates" | "Esports" | "Community";
  title: string;
  imageSrc: string;
  link: string;
  description?: string;
};

// This would come from a backend API or CMS in a real app
const newsItems: NewsItem[] = [
  {
    id: "patch-10-05",
    date: "3/18/2025",
    category: "Game Updates",
    title: "OVERWATCH Patch Notes 10.05",
    imageSrc: "/images/news/patch-10-05.jpg",
    link: "/news/game-updates/valorant-patch-notes-10-05",
    description: "Ranked Rollbacks are now live along with some minor bug fixes."
  },
  {
    id: "masters-toronto",
    date: "3/18/2025",
    category: "Esports",
    title: "Masters Toronto: Live audience and ticket sale information",
    imageSrc: "/images/news/masters-toronto.jpg",
    link: "https://valorantesports.com/en-us/news/masters-toronto-live-audience-and-ticket-sale-information",
    description: "We're thrilled to announce that tickets for OVERWATCH Masters Toronto will be available starting March 25 at 7 AM PT / 10 AM ET!"
  },
  {
    id: "tier-lists",
    date: "3/20/2025",
    category: "Esports",
    title: "Pros Make Player Tier Lists",
    imageSrc: "/images/news/tier-lists.jpg",
    link: "https://www.youtube.com/watch?v=MVFxibCb5Kk",
    description: "OVERWATCH pros race to complete a 2025 player tier list before time runs out!"
  },
  {
    id: "vct-americas",
    date: "3/20/2025",
    category: "Esports",
    title: "Watch the OWL Americas 2025 Stage 1 Trailer",
    imageSrc: "/images/news/vct-americas.jpg",
    link: "https://www.youtube.com/watch?v=hU1Y5yjgd00",
    description: "March 21 - May 4"
  },
  {
    id: "cyrax-skin",
    date: "3/3/2025",
    category: "Game Updates",
    title: "Starforged // New Legendary Skin Reveal Trailer",
    imageSrc: "/images/news/cyrax-skin.jpg",
    link: "https://www.youtube.com/watch?v=97eAYyVHsUE",
    description: "See the all-consuming crystals in action before they hit your shop."
  },
  {
    id: "vct-americas-everything",
    date: "3/7/2025",
    category: "Esports",
    title: "OWL Americas 2025 Stage 1: Everything You Need to Know",
    imageSrc: "/images/news/vct-americas-everything.jpg",
    link: "https://valorantesports.com/en-us/news/vct-americas-2025-stage-1-everything-you-need-to-know",
    description: "Stage 1 kicks off on March 21st at 2pm PT"
  },
  {
    id: "patch-10-04",
    date: "3/4/2025",
    category: "Game Updates",
    title: "OVERWATCH Patch Notes 10.04",
    imageSrc: "/images/news/patch-10-04.jpg",
    link: "/news/game-updates/valorant-patch-notes-10-04",
    description: "New Hero: Echo, major updates to various Heroes, new map rotation, updates to King's Row, and more."
  },
  {
    id: "best-of-masters",
    date: "3/7/2025",
    category: "Esports",
    title: "Best Of OVERWATCH Masters Bangkok",
    imageSrc: "/images/news/best-of-masters.jpg",
    link: "https://www.youtube.com/watch?v=dNf6-Qd6z0k",
    description: "The first global event of the year did not disappoint. Here are the best OVERWATCH plays of Masters Bangkok."
  },
  {
    id: "waylay-gameplay",
    date: "3/2/2025",
    category: "Game Updates",
    title: "Echo Gameplay Reveal Trailer",
    imageSrc: "/images/news/waylay-gameplay.jpg",
    link: "https://www.youtube.com/watch?v=njK6KgRNr2k",
    description: "Master the skies with OVERWATCH's newest DPS hero: Echo."
  },
  {
    id: "waylay-agent",
    date: "3/2/2025",
    category: "Game Updates",
    title: "DAWN BREAKS // Echo Hero Trailer - OVERWATCH",
    imageSrc: "/images/news/waylay-agent.jpg",
    link: "https://www.youtube.com/watch?v=OHzUoFKPUB0",
    description: "Take to the skies with Echo – OVERWATCH's new Omnic DPS Hero. Available in Season 25."
  },
  {
    id: "valentines-day",
    date: "2/28/2025",
    category: "Community",
    title: "Love is in the air: Community created content for Valentine's Day",
    imageSrc: "/images/news/valentines-day.jpg",
    link: "/news/community/love-is-in-the-lobby-community-created-content-for-v-day",
    description: "Our favorite duos, Valentine's Day cards, and more."
  },
  {
    id: "community-code",
    date: "6/2/2020",
    category: "Community",
    title: "OVERWATCH Community Code",
    imageSrc: "/images/news/community-code-header.jpg",
    link: "/news/announcements/valorant-community-code",
    description: "Here are our expectations of you as we build this long-lasting community together."
  },
  {
    id: "beginners-guide",
    date: "8/2/2024",
    category: "Community",
    title: "Beginner's Guide",
    imageSrc: "/images/news/tier-lists.jpg",
    link: "/news/announcements/beginners-guide",
    description: "Wanna get good at OVERWATCH? Here's your first stop."
  },
];

export default function NewsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
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

  const filteredNews = activeFilter === "ALL"
    ? newsItems
    : newsItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden">
        {/* Background with news collage effect */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Main banner image */}
          <Image 
            src="/images/news/news-banner-main.jpg" 
            alt="Overwatch News Banner" 
            fill 
            className="object-cover object-center z-0"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/95 z-10"></div>
          
          {/* News grid background effect */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1 opacity-40 z-0">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="relative overflow-hidden">
                <Image 
                  src={`/images/news/news-${(index % 5) + 1}.jpg`} 
                  alt="" 
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Animated lines */}
          <div className="absolute inset-0 z-20">
            <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-blue to-transparent animate-pulse"></div>
            <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-blue to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary-blue to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary-blue to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
          </div>
          
          {/* Digital particles effect */}
          <div className="absolute inset-0 z-20">
            {[...Array(20)].map((_, index) => (
              <div 
                key={index}
                className="absolute bg-primary-blue/30 rounded-full animate-ping"
                style={{
                  width: `${Math.random() * 10 + 2}px`,
                  height: `${Math.random() * 10 + 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 8 + 2}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative py-32 z-30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-4 px-4 py-1 border border-primary-blue/50 bg-primary-blue/10 rounded-full">
                <span className="text-primary-blue text-sm font-medium tracking-wider uppercase">Latest Updates</span>
              </div>
              
              <h1 className="overwatch-heading text-5xl md:text-7xl lg:text-8xl mb-6 text-white">
                OVERWATCH <span className="text-primary-blue">NEWS FEED</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Stay informed with the latest game updates, esports events, and community highlights from around the Overwatch universe
              </p>
              
              {/* Search bar */}
              <div className="relative max-w-xl mx-auto mt-8">
                <input 
                  type="text" 
                  placeholder="Search news articles..." 
                  className="w-full bg-gray-800/80 border border-gray-700 text-white px-5 py-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue/50"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              
              {/* Featured categories */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <a href="#game-updates" className="px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white hover:bg-primary-blue/20 hover:border-primary-blue/50 transition-all">
                  Game Updates
                </a>
                <a href="#esports" className="px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white hover:bg-primary-blue/20 hover:border-primary-blue/50 transition-all">
                  Esports
                </a>
                <a href="#community" className="px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white hover:bg-primary-blue/20 hover:border-primary-blue/50 transition-all">
                  Community
                </a>
                <a href="#patch-notes" className="px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg text-white hover:bg-primary-blue/20 hover:border-primary-blue/50 transition-all">
                  Patch Notes
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent z-30"></div>
      </section>

      {/* News Filter & Grid */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Filter Tabs */}
          <div className="mb-10">
            <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NewsCard item={item} />
              </motion.div>
            ))}
          </div>

          {/* Show More Button */}
          <div className="flex justify-center mt-16">
            <button className="overwatch-btn-primary transform hover:scale-105 transition-transform">
              SHOW MORE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

type FilterTabsProps = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};

const FilterTabs = ({ activeFilter, setActiveFilter }: FilterTabsProps) => {
  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 border-b border-gray-700 pb-4">
      <button
        className={`font-din uppercase tracking-wide text-base ${
          activeFilter === "ALL"
            ? "font-bold text-primary-blue border-b-2 border-primary-blue pb-2"
            : "text-gray-300 hover:text-primary-blue transition-colors"
        }`}
        onClick={() => setActiveFilter("ALL")}
      >
        ALL
      </button>
      <button
        className={`font-din uppercase tracking-wide text-base ${
          activeFilter === "Game Updates"
            ? "font-bold text-primary-blue border-b-2 border-primary-blue pb-2"
            : "text-gray-300 hover:text-primary-blue transition-colors"
        }`}
        onClick={() => setActiveFilter("Game Updates")}
      >
        GAME UPDATES
      </button>
      <button
        className={`font-din uppercase tracking-wide text-base ${
          activeFilter === "Esports"
            ? "font-bold text-primary-blue border-b-2 border-primary-blue pb-2"
            : "text-gray-300 hover:text-primary-blue transition-colors"
        }`}
        onClick={() => setActiveFilter("Esports")}
      >
        ESPORTS
      </button>
      <button
        className={`font-din uppercase tracking-wide text-base ${
          activeFilter === "Community"
            ? "font-bold text-primary-blue border-b-2 border-primary-blue pb-2"
            : "text-gray-300 hover:text-primary-blue transition-colors"
        }`}
        onClick={() => setActiveFilter("Community")}
      >
        COMMUNITY
      </button>
    </div>
  );
};

const NewsCard = ({ item }: { item: NewsItem }) => {
  return (
    <a
      href={item.link}
      target={item.link.startsWith("http") ? "_blank" : "_self"}
      rel={item.link.startsWith("http") ? "noopener noreferrer" : ""}
      className="block group bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-primary-blue/20 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 w-full">
          <div className="h-0 pb-[56.25%] relative">
            <Image
              src={item.imageSrc}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              width={400}
              height={225}
            />
          </div>
        </div>
        <div className="absolute top-0 left-0 bg-primary-blue text-white text-xs font-din uppercase px-3 py-1">
          {item.category}
        </div>
        <div className="absolute top-0 right-0 bg-gray-900/80 text-white text-xs font-din px-3 py-1">
          {item.date}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-white group-hover:text-primary-blue transition-colors">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-gray-300 mt-2 text-sm">{item.description}</p>
        )}
      </div>
    </a>
  );
};
