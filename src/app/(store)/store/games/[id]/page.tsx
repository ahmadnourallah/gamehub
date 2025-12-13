import { getGame } from '@/actions/game';
import { notFound } from 'next/navigation';
import GameDetails from '@/components/store/GameDetails';
import AddToCartButton from '@/components/store/AddToCartButton';
import BackButton from '@/components/store/BackButton';
import Carousel from '@/components/common/Carousel';
import Image from 'next/image';
import shimmer from '@/utils/shimmer';

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

                <Carousel
                    className="h-120 overflow-hidden rounded-2xl"
                    enableDots={true}
                >
                    <div className="embla__container flex h-full">
                        {game.images.map((image, i) => (
                            <div
                                key={i}
                                className="embla__slide relative h-full min-w-0 flex-[0_0_100%]"
                            >
                                <Image
                                    alt=""
                                    placeholder={`data:image/svg+xml;base64,${shimmer()}`}
                                    src={`${process.env.NEXT_PUBLIC_API}/${image}`}
                                    width={0}
                                    height={0}
                                    className="h-full w-full"
                                    sizes="100vw"
                                    objectFit="cover"
                                    objectPosition="center"
                                    fill
                                />
                            </div>
                        ))}
                    </div>
                </Carousel>

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
