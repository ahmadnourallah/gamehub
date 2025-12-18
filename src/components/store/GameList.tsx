import type { GameType } from '@/lib/types';
import GameCard from '@/components/store/GameCard';
import Pagination from '@/components/common/Pagination';

export default async function GameList({
    games,
    pageSize,
    total,
    currentPage
}: {
    games: GameType[];
    pageSize?: number;
    total: number;
    currentPage: number;
}) {
    if (games.length > 0) {
        return (
            <div className="mb-8">
                <div className="grid h-max grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                    {games.map((game) => (
                        <GameCard
                            key={game.id}
                            id={game.id}
                            className="scaleOnHover"
                            title={game.title}
                            price={game.price}
                            thumbnail={game.images[0]}
                            platforms={game.platforms}
                        />
                    ))}
                </div>
                <Pagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    total={total}
                />
            </div>
        );
    } else {
        return (
            <div className="text-text-primary absolute top-1/2 w-full text-center text-3xl font-bold">
                No Games Found
            </div>
        );
    }
}
