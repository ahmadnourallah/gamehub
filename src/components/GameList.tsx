import { GameType } from '@/queries/game';
import Link from 'next/link';
import GameCard from './GameCard';

export default function GameList({ games }: { games: GameType[] }) {
    return (
        <div className="grid h-max w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            {games.map((game) => (
                <Link href={`store/games/${game.id}`} key={game.id}>
                    <GameCard
                        className="scaleOnHover"
                        title={game.title}
                        price={game.price}
                        thumbnail={game.images[0]}
                        isAdded={false}
                        platforms={game.platforms}
                    />
                </Link>
            ))}
        </div>
    );
}
