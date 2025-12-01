import { getGame } from '@/queries/game';
import { notFound } from 'next/navigation';
import PreviewCarousel from '@/components/PreviewCarousel';
import GameDetails from '@/components/GameDetails';
import AddToCartButton from '@/components/AddToCartButton';
import BackButton from '@/components/BackButton';

export default async function Game({
    params
}: {
    params: Promise<{ id: number }>;
}) {
    const { id } = await params;
    const response = await getGame(id);

    if (response.status === 'fail') notFound();
    else {
        const game = response.data.game;

        return (
            <div className="w-full pb-4">
                <div className="flex items-baseline justify-between">
                    <BackButton />
                    <h1 className="mb-10 text-5xl font-bold">{game.title}</h1>
                </div>

                <PreviewCarousel images={game.images} />

                <GameDetails game={game} />

                <div className="mt-4 flex justify-between rounded-lg bg-[#202020] p-4">
                    <div className="text-lg font-bold">${game.price}</div>
                    <AddToCartButton
                        gameId={game.id}
                        className="text-2xl font-bold text-[rgb(24,176,171)]"
                    />
                </div>
            </div>
        );
    }
}
