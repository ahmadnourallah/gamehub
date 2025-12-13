'use client';
import {
    mdiCart,
    mdiConsole,
    mdiGamepad,
    mdiGamepadVariant,
    mdiHome,
    mdiClose,
    mdiMenu
} from '@mdi/js';
import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import Slider from '../common/Slider';
import Icon from '@mdi/react';
import Link from 'next/link';
import Logo from '@/components/common/Logo';

function DashNavItem({
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
        <Link href={link} className="w-full">
            <li
                className={`flex items-center gap-2 px-4 py-6 transition-colors duration-300 hover:bg-white hover:text-black ${pathname === link ? 'bg-white text-black' : ''}`}
            >
                <Icon path={icon} size={1.2} />
                <div className="text-lg">{children}</div>
            </li>
        </Link>
    );
}

export default function DashNavbar() {
    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsActive(!isActive)}
                className="fixed right-8 bottom-4 z-70 rounded-full bg-white p-1.5 text-2xl sm:hidden"
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
                <nav className="scrollbar-hidden h-screen overflow-y-auto bg-[rgb(32,32,32)]">
                    <ul className="flex flex-col items-center text-xl">
                        <li className="flex w-max items-center gap-4 p-4 select-none">
                            <Logo />
                        </li>
                        <DashNavItem link="/dashboard" icon={mdiHome}>
                            Home
                        </DashNavItem>
                        <DashNavItem link="/dashboard/carts" icon={mdiCart}>
                            Carts
                        </DashNavItem>
                        <DashNavItem link="/dashboard/games" icon={mdiGamepad}>
                            Games
                        </DashNavItem>
                        <DashNavItem
                            link="/dashboard/genres"
                            icon={mdiGamepadVariant}
                        >
                            Genres
                        </DashNavItem>
                        <DashNavItem
                            link="/dashboard/platforms"
                            icon={mdiConsole}
                        >
                            Platforms
                        </DashNavItem>
                    </ul>
                </nav>
            </Slider>
        </>
    );
}
