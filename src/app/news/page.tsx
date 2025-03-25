"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
    title: "VALORANT Patch Notes 10.05",
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
    description: "We're thrilled to announce that tickets for VALORANT Masters Toronto will be available starting March 25 at 7 AM PT / 10 AM ET!"
  },
  {
    id: "tier-lists",
    date: "3/20/2025",
    category: "Esports",
    title: "Pros Make Player Tier Lists",
    imageSrc: "/images/news/tier-lists.jpg",
    link: "https://www.youtube.com/watch?v=MVFxibCb5Kk",
    description: "VALORANT pros race to defuse the spike by completing a 2025 player tier list before it detonates!"
  },
  {
    id: "vct-americas",
    date: "3/20/2025",
    category: "Esports",
    title: "Watch the VCT Americas 2025 Stage 1 Trailer",
    imageSrc: "/images/news/vct-americas.jpg",
    link: "https://www.youtube.com/watch?v=hU1Y5yjgd00",
    description: "March 21 - May 4"
  },
  {
    id: "cyrax-skin",
    date: "3/3/2025",
    category: "Game Updates",
    title: "Starforged // Cyrax Skin Reveal Trailer - VALORANT",
    imageSrc: "/images/news/cyrax-skin.jpg",
    link: "https://www.youtube.com/watch?v=97eAYyVHsUE",
    description: "See the all-consuming crystals in action before Cyrax hits your shop."
  },
  {
    id: "vct-americas-everything",
    date: "3/7/2025",
    category: "Esports",
    title: "VCT Americas 2025 Stage 1: Everything You Need to Know",
    imageSrc: "/images/news/vct-americas-everything.jpg",
    link: "https://valorantesports.com/en-us/news/vct-americas-2025-stage-1-everything-you-need-to-know",
    description: "Stage 1 kicks off on March 21st at 2pm PT"
  },
  {
    id: "patch-10-04",
    date: "3/4/2025",
    category: "Game Updates",
    title: "VALORANT Patch Notes 10.04",
    imageSrc: "/images/news/patch-10-04.jpg",
    link: "/news/game-updates/valorant-patch-notes-10-04",
    description: "New Duelist: Waylay, major updates to various Agents, new map rotation, updates to Ascent, and more."
  },
  {
    id: "best-of-masters",
    date: "3/7/2025",
    category: "Esports",
    title: "Best Of VALORANT Masters Bangkok",
    imageSrc: "/images/news/best-of-masters.jpg",
    link: "https://www.youtube.com/watch?v=dNf6-Qd6z0k",
    description: "The first global event of the year did not disappoint. Here are the best VALORANT plays of Masters Bangkok."
  },
  {
    id: "waylay-gameplay",
    date: "3/2/2025",
    category: "Game Updates",
    title: "Waylay Gameplay Reveal Trailer",
    imageSrc: "/images/news/waylay-gameplay.jpg",
    link: "https://www.youtube.com/watch?v=njK6KgRNr2k",
    description: "Bend light to break your foes with VALORANT's newest Duelist: Waylay."
  },
  {
    id: "waylay-agent",
    date: "3/2/2025",
    category: "Game Updates",
    title: "DAWN BREAKS // Waylay Agent Trailer - VALORANT",
    imageSrc: "/images/news/waylay-agent.jpg",
    link: "https://www.youtube.com/watch?v=OHzUoFKPUB0",
    description: "Bend light to break your foes with Waylay – VALORANT's new Thai Duelist Agent. Available in S25: ACT II."
  },
  {
    id: "valentines-day",
    date: "2/28/2025",
    category: "Community",
    title: "Love is in the lobby: Community created content for V-Day",
    imageSrc: "/images/news/valentines-day.jpg",
    link: "/news/community/love-is-in-the-lobby-community-created-content-for-v-day",
    description: "Our favorite duos, Valentine's Day cards, and more."
  },
  {
    id: "community-code",
    date: "6/2/2020",
    category: "Community",
    title: "VALORANT Community Code",
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
    description: "Wanna get good at VALORANT? Here's your first stop."
  },
];

export default function NewsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const filteredNews = activeFilter === "ALL"
    ? newsItems
    : newsItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-valorant-light">
      {/* Hero Section */}
      <section className="bg-valorant-dark py-12 md:py-20">
        <div className="valorant-container">
          <h1 className="font-tungsten text-white text-7xl md:text-9xl uppercase tracking-wide">
            NEWS
          </h1>
        </div>
      </section>

      {/* News Filter & Grid */}
      <section className="py-16 bg-valorant-light">
        <div className="valorant-container">
          {/* Filter Tabs */}
          <div className="mb-10">
            <FilterTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>

          {/* Show More Button */}
          <div className="flex justify-center mt-16">
            <button className="flex items-center space-x-2 font-din uppercase font-bold text-sm tracking-wider hover:text-valorant-red transition-colors">
              <span>SHOW MORE</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
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
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 border-b border-gray-300 pb-4">
      <button
        className={`font-din uppercase tracking-wide text-base ${
          activeFilter === "ALL"
            ? "font-bold text-valorant-red border-b-2 border-valorant-red pb-2"
            : "hover:text-valorant-red transition-colors"
        }`}
        onClick={() => setActiveFilter("ALL")}
      >
        ALL
      </button>
      <button
        className={`font-din uppercase tracking-wide text-base ${
          activeFilter === "Game Updates"
            ? "font-bold text-valorant-red border-b-2 border-valorant-red pb-2"
            : "hover:text-valorant-red transition-colors"
        }`}
        onClick={() => setActiveFilter("Game Updates")}
      >
        GAME UPDATES
      </button>
      <button
        className={`font-din uppercase tracking-wide text-base ${
          activeFilter === "Esports"
            ? "font-bold text-valorant-red border-b-2 border-valorant-red pb-2"
            : "hover:text-valorant-red transition-colors"
        }`}
        onClick={() => setActiveFilter("Esports")}
      >
        ESPORTS
      </button>
      <button
        className={`font-din uppercase tracking-wide text-base ${
          activeFilter === "Community"
            ? "font-bold text-valorant-red border-b-2 border-valorant-red pb-2"
            : "hover:text-valorant-red transition-colors"
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
    <Link
      href={item.link}
      target={item.link.startsWith("http") ? "_blank" : "_self"}
      rel={item.link.startsWith("http") ? "noopener noreferrer" : ""}
      className="block group"
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
        <div className="absolute top-0 left-0 bg-valorant-red text-white text-xs font-din uppercase px-3 py-1">
          {item.category}
        </div>
        <div className="absolute top-0 right-0 bg-valorant-dark text-white text-xs font-din px-3 py-1">
          {item.date}
        </div>
      </div>
      <h3 className="font-bold mt-2 text-lg group-hover:text-valorant-red transition-colors">
        {item.title}
      </h3>
      {item.description && (
        <p className="text-gray-700 mt-1 text-sm">{item.description}</p>
      )}
    </Link>
  );
};
