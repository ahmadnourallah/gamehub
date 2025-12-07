import { mdiGamepadVariant } from '@mdi/js';
import { getGames } from '@/queries/game';
import Link from 'next/link';
import Icon from '@mdi/react';
import Button from '@/components/common/Button';
import GameSlider from '@/components/store/GameSlider';
import Hero from '@/components/store/Hero';
import Header from '@/components/store/Header';

export default async function Home() {
    const games = await getGames();

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

                    <GameSlider games={games} />

                    <div className="m-6 flex justify-center">
                        <Link href="/store">
                            <Button className="flex items-center gap-2">
                                <Icon path={mdiGamepadVariant} size={1.2} />
                                <span>Check out more</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                <footer className="bg-[#202020] p-6 text-center text-lg font-bold">
                    @ All rights reserved to Ahmad Nour Alla
                </footer>
            </div>
        </>
    );
}
