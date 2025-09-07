import { GameType } from '@/queries/game';
import GameCard from './GameCard';

export default function GameList({ games }: { games: GameType[] }) {
    return (
        <div className="grid h-max w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            {games.map((game) => (
                <GameCard
                    key={game.id}
                    id={game.id}
                    className="scaleOnHover"
                    title={game.title}
                    price={game.price}
                    thumbnail={game.images[0]}
                    isAdded={false}
                    platforms={game.platforms}
                />
            ))}
        </div>
    );
}
