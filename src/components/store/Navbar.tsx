'use client';
import { mdiClose, mdiFire, mdiMenu } from '@mdi/js';
import { QueryAllResponseType, GenreType, PlatformType } from '@/lib/types';
import { getGenreIcon, getPlatformIcon } from '@/lib/utils';
import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import Slider from '@/components/common/Slider';
import Icon from '@mdi/react';
import Link from 'next/link';

function NavItem({
    children,
    icon,
    link
}: {
    children: ReactNode;
    icon: string;
    link: string;
}) {
    const pathname = usePathname();

    return (
        <Link
            href={link}
            className="group flex items-center gap-3 focus:outline-none"
        >
            <div
                className={`rounded-md p-1.5 transition-colors duration-400 group-focus:bg-white group-focus:text-black ${pathname === link ? 'bg-white text-black' : 'bg-gray-dark text-white group-hover:bg-white group-hover:text-black'}`}
            >
                <Icon path={icon} size={1.3} />
            </div>
            <li className="text-lg">{children}</li>
        </Link>
    );
}

export default function Navbar({
    genreResponse,
    platformResponse
}: {
    genreResponse: QueryAllResponseType<'genres', GenreType[]>;
    platformResponse: QueryAllResponseType<'platforms', PlatformType[]>;
}) {
    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsActive(!isActive)}
                className="fixed right-4 bottom-4 z-70 rounded-full bg-white p-1.5 text-2xl sm:hidden"
            >
                <Icon
                    path={isActive ? mdiClose : mdiMenu}
                    size={1.3}
                    color="#000"
                />
            </button>

            <Slider
                className="bg-background h-full overflow-visible sm:visible! sm:static sm:transform-none! sm:p-0"
                isActive={isActive}
            >
                <nav className="scrollbar-hidden border-r-gray-dark flex h-full flex-col gap-8 overflow-x-visible overflow-y-auto border-r p-4 sm:border-none">
                    <div>
                        <ul>
                            <NavItem link="/store" icon={mdiFire}>
                                Latest Games
                            </NavItem>
                        </ul>
                    </div>

                    {genreResponse.status === 'success' && (
                        <div>
                            <div className="mb-2 text-4xl font-bold">
                                Genres
                            </div>
                            <ul className="flex flex-col gap-2">
                                {genreResponse.data.genres.map(
                                    (genre, index) => (
                                        <NavItem
                                            key={index}
                                            link={`/store/genres/${genre.name}`}
                                            icon={getGenreIcon(genre.name)}
                                        >
                                            {genre.name}
                                        </NavItem>
                                    )
                                )}
                            </ul>
                        </div>
                    )}

                    {platformResponse.status === 'success' && (
                        <div>
                            <div className="mb-2 text-4xl font-bold">
                                Platforms
                            </div>
                            <ul className="flex flex-col gap-2">
                                {platformResponse.data.platforms.map(
                                    (platform, index) => (
                                        <NavItem
                                            key={index}
                                            link={`/store/platforms/${platform.name}`}
                                            icon={getPlatformIcon(
                                                platform.name
                                            )}
                                        >
                                            {platform.name}
                                        </NavItem>
                                    )
                                )}
                            </ul>
                        </div>
                    )}
                </nav>
            </Slider>
        </>
    );
}
