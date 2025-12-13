'use client';
import { useAnimate } from 'motion/react';
import { mdiMagnify } from '@mdi/js';
import { useQuery } from '@tanstack/react-query';
import { getGames } from '@/actions/game';
import { useState } from 'react';
import { useOutsideClick } from '@/lib/hooks';
import shimmer from '@/lib/shimmer';
import Image from 'next/image';
import Icon from '@mdi/react';
import Spinner from './Spinner';
import Link from 'next/link';

export default function SearchBar() {
    const [isActive, setIsActive] = useState(false);
    const [search, setSearch] = useState('');
    const {
        isLoading,
        isSuccess,
        data: response
    } = useQuery({
        queryKey: ['search', search],
        queryFn: () => getGames(0, 3, search),
        enabled: search.length > 0
    });

    const [scope, animate] = useAnimate();

    const animateWidth = async (width: string) => {
        await animate(
            scope.current,
            { width },
            { duration: 0.4, type: 'spring' }
        );
    };

    const open = async () => {
        setIsActive(true);
        await animateWidth('40%');
    };

    const close = async () => {
        setIsActive(false);
        await animateWidth('revert-layer');
    };

    const ref = useOutsideClick(close);

    return (
        <div ref={scope} className="relative not-sm:!w-full sm:w-1/4">
            <div ref={ref}>
                <input
                    onFocus={open}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search games..."
                    className="h-[50%] !w-full rounded-md bg-white py-2 pr-11 pl-3 text-black after:content-none focus:outline-0"
                />
                <button className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
                    <Icon path={mdiMagnify} size={1} color="#000" />
                </button>

                <div
                    className={`absolute top-12 h-70 w-full overflow-y-auto rounded-md bg-white text-black ${isActive ? 'block' : 'hidden'}`}
                >
                    {isSuccess &&
                        response.status === 'success' &&
                        response.data.games.length > 0 &&
                        response.data.games.map((game) => (
                            <Link
                                onClick={close}
                                href={`/store/games/${game.id}`}
                                className="flex cursor-pointer flex-col items-center gap-4 p-4 hover:bg-[rgb(218,218,218)] focus:bg-[rgb(218,218,218)] focus:outline-none sm:flex-row"
                                key={game.id}
                            >
                                <Image
                                    className="h-full w-full rounded-md sm:h-25 sm:w-30"
                                    placeholder={`data:image/svg+xml;base64,${shimmer()}`}
                                    src={`${process.env.NEXT_PUBLIC_API}/${game.images[0]}`}
                                    alt=""
                                    width={0}
                                    height={0}
                                    sizes="100%"
                                />
                                <span className="text-center sm:text-left">
                                    {game.title}
                                </span>
                            </Link>
                        ))}
                    {isSuccess &&
                        response.status === 'success' &&
                        response.data.games.length === 0 && (
                            <div className="flex h-full items-center justify-center">
                                No results
                            </div>
                        )}
                    {isLoading && (
                        <div className="flex h-full items-center justify-center">
                            <Spinner size="50px" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
