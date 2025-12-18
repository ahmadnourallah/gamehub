import { mdiGamepadVariant } from '@mdi/js';
import { getGames } from '@/actions/game';
import Link from 'next/link';
import Icon from '@mdi/react';
import Button from '@/components/common/Button';
import GameCard from '@/components/store/GameCard';
import Hero from '@/components/store/Hero';
import Header from '@/components/store/Header';
import Carousel from '@/components/common/Carousel';

export default async function Home() {
    const gameResponse = await getGames();

    return (
        <>
            <Header />
            <div className="flex flex-col gap-10">
                <Hero />

                <div>
                    <div className="container mx-auto mb-4 flex flex-col items-center text-center">
                        <h1 className="w-max border-b-2 border-b-white text-4xl font-bold">
                            Latest Games
                        </h1>
                        <p className="m-4 text-lg">
                            A select of the latest and best games you&apos;ll
                            ever play
                        </p>
                    </div>

                    {gameResponse.status === 'fail' ||
                    (gameResponse.status === 'success' &&
                        gameResponse.data.total === 0) ? (
                        'No Games Found'
                    ) : (
                        <Carousel
                            className="overflow-hidden"
                            options={{ dragFree: true }}
                        >
                            <div className="embla__container flex h-max *:mx-2 *:flex-[0_0_50%] sm:*:flex-[0_0_25%]">
                                {gameResponse.data.games.map((game, i) => (
                                    <div
                                        key={i}
                                        className="embla__slide h-revert min-w-0"
                                    >
                                        <GameCard
                                            id={game.id}
                                            thumbnail={game.images[0]}
                                            title={game.title}
                                            price={game.price}
                                            platforms={game.platforms}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Carousel>
                    )}
                    <div className="m-6 flex justify-center">
                        <Link href="/store">
                            <Button className="flex items-center gap-2">
                                <Icon path={mdiGamepadVariant} size={1.2} />
                                <span>Check out more</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                <footer className="bg-gray-dark p-6 text-center text-lg font-bold">
                    @ All rights reserved to Ahmad Nour Alla
                </footer>
            </div>
        </>
    );
}
