import Image from 'next/image';
import Link from 'next/link';

interface HeroCardProps {
  character: {
    id: string;
    name: string;
    role: string;
    fullPortrait: string;
  };
}

const HeroCard = ({ character }: HeroCardProps) => {
  return (
    <Link href={`/heroes/${character.id}`} className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
        <Image
          src={character.fullPortrait}
          alt={character.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="text-xl font-bold text-white">{character.name}</h2>
          <p className="text-sm text-gray-300">{character.role}</p>
        </div>
      </div>
    </Link>
  );
};

export default HeroCard;
