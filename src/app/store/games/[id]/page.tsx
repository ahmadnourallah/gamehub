import { getGame } from '@/queries/game';
import PreviewCarousel from '@/components/PreviewCarousel';
import GameDetails from '@/components/GameDetails';

export default async function Game({ params }) {
    const { id } = await params;
    const game = await getGame(id);

    return (
        <div className="w-full">
            <h1 className="mb-10 text-5xl font-bold">{game.title}</h1>
            <PreviewCarousel images={game.images} />

            <GameDetails game={game} />

            <div className="mt-4 flex justify-between rounded-lg bg-[#202020] p-4">
                <div className="text-lg font-bold">${game.price}</div>
                <button className="text-2xl font-bold text-[rgb(24,176,171)]">
                    {true ? `Added ✓` : 'Add to cart +'}
                </button>
            </div>
        </div>
    );
}
