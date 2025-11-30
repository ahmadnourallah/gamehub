'use client';
import { mdiClose, mdiFire, mdiMenu } from '@mdi/js';
import { Platforms, Genres } from '@/utils/icons';
import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import Slider from './Slider';
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
        <Link href={link} className="group flex items-center gap-3">
            <div
                className={`rounded-md p-1.5 transition-colors duration-400 ${pathname === link ? 'bg-white text-black' : 'bg-[#202020] text-white group-hover:bg-white group-hover:text-black'}`}
            >
                <Icon path={icon} size={1.3} />
            </div>
            <li className="text-lg">{children}</li>
        </Link>
    );
}

export default function Navbar() {
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
                className="bg-background sm:!visible sm:static sm:h-auto sm:!transform-none sm:p-0"
                isActive={isActive}
            >
                <nav className="flex flex-col gap-8 border-r-1 border-r-[#202020] p-4 sm:border-none">
                    <div>
                        <ul>
                            <NavItem link="/store" icon={mdiFire}>
                                Latest Games
                            </NavItem>
                        </ul>
                    </div>

                    <div>
                        <div className="mb-2 text-4xl font-bold">Genres</div>
                        <ul className="flex flex-col gap-2">
                            {Object.entries(Genres).map(
                                ([genre, icon], index: number) => (
                                    <NavItem
                                        key={index}
                                        link={`/store/genres/${genre}`}
                                        icon={icon}
                                    >
                                        {genre}
                                    </NavItem>
                                )
                            )}
                        </ul>
                    </div>

                    <div>
                        <div className="mb-2 text-4xl font-bold">Platforms</div>
                        <ul className="flex flex-col gap-2">
                            {Object.entries(Platforms).map(
                                ([platform, icon], index: number) => (
                                    <NavItem
                                        key={index}
                                        link={`/store/platforms/${platform}`}
                                        icon={icon}
                                    >
                                        {platform}
                                    </NavItem>
                                )
                            )}
                        </ul>
                    </div>
                </nav>
            </Slider>
        </>
    );
}
