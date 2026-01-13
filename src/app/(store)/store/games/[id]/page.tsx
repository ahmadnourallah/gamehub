import { getGame } from '@/actions/game';
import { notFound } from 'next/navigation';
import { shimmer } from '@/lib/utils';
import type { Metadata } from 'next';
import GameDetails from '@/components/store/GameDetails';
import AddToCartButton from '@/components/store/AddToCartButton';
import BackButton from '@/components/store/BackButton';
import Carousel from '@/components/common/Carousel';
import Image from 'next/image';

export async function generateMetadata({
    params
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;

    const response = await getGame(id);

    if (response.status === 'success') {
        const game = response.data.game;

        return {
            title: `GameHub - ${game.title}`,
            description: `${game.description.substring(0, 151)}...`
        };
    }

    return {};
}

export default async function Game({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const response = await getGame(id);

    if (response.status === 'fail' && response.code === 404) notFound();
    else if (response.status === 'fail') throw new Error();
    else {
        const game = response.data.game;

        return (
            <div className="w-full pb-4">
                <div className="flex flex-col items-baseline justify-between gap-4 md:flex-row">
                    <BackButton />
                    <h1 className="mb-10">{game.title}</h1>
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

                <div className="bg-gray-dark mt-4 flex justify-between rounded-lg p-4">
                    <div className="text-lg font-bold">${game.price}</div>
                    <AddToCartButton
                        gameId={game.id}
                        className="text-text-primary text-xl font-bold md:text-2xl"
                    />
                </div>
            </div>
        );
    }
}
