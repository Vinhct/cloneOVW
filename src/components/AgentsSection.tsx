import Link from "next/link";
import Image from "next/image";

const AgentsSection = () => {
  return (
    <section className="py-20 bg-overwatch-blue-dark text-white relative overflow-hidden">
      {/* Background geometric elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-overwatch-blue opacity-10 rounded-full transform -translate-y-1/4 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-overwatch-blue-light opacity-10 rounded-full transform translate-y-1/4 -translate-x-1/4"></div>
      
      {/* Hexagon patterns - Overwatch style */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-10 left-1/4 w-32 h-32 border-2 border-overwatch-blue rotate-45"></div>
        <div className="absolute bottom-20 right-1/3 w-40 h-40 border-2 border-overwatch-blue rotate-12"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 border-2 border-overwatch-blue rotate-30"></div>
      </div>

      <div className="valorant-container relative z-10">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 mb-10 lg:mb-0 order-2 lg:order-1">
            <h2 className="overwatch-heading text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-none mb-8">
              YOUR HEROES
            </h2>
            <p className="overwatch-subheading uppercase text-lg mb-6">
              THE WORLD NEEDS HEROES
            </p>
            <p className="mb-8 text-white/90 leading-relaxed max-w-lg">
              Join the fight for the future in a world where every battle counts. Choose your hero from a diverse cast of soldiers, scientists, adventurers, and oddities. Bend time, defy physics, and unleash a dizzying array of extraordinary powers and weapons.
            </p>
            <Link href="/agents" className="overwatch-btn-secondary">
              VIEW ALL HEROES
            </Link>
          </div>
          <div className="lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <Image
                src="/images/agents-group.png"
                alt="Overwatch Heroes"
                width={600}
                height={700}
                className="object-contain"
              />

              {/* Hero ability visual effects */}
              <div className="absolute top-1/4 -left-10 w-20 h-20 bg-overwatch-blue opacity-30 blur-lg rounded-full"></div>
              <div className="absolute bottom-1/3 right-0 w-16 h-16 bg-overwatch-orange opacity-30 blur-lg rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
