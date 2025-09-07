import {
    mdiFire,
    mdiBoxingGlove,
    mdiMicrosoftWindows,
    mdiMicrosoftXbox,
    mdiChessRook,
    mdiSwordCross,
    mdiPistol,
    mdiPyramid,
    mdiPuzzle,
    mdiFlagCheckered,
    mdiFootball,
    mdiSonyPlaystation,
    mdiNintendoSwitch,
    mdiAppleIos,
    mdiAndroid
} from '@mdi/js';
import { ReactNode } from 'react';
import Icon from '@mdi/react';

export const Platforms = {
    PC: mdiMicrosoftWindows,
    PlayStation: mdiSonyPlaystation,
    Xbox: mdiMicrosoftXbox,
    Nintendo: mdiNintendoSwitch,
    iOS: mdiAppleIos,
    Android: mdiAndroid
};

export const Genres = {
    Action: mdiBoxingGlove,
    Strategy: mdiChessRook,
    RPG: mdiSwordCross,
    Shooter: mdiPistol,
    Adventure: mdiPyramid,
    Puzzle: mdiPuzzle,
    Racing: mdiFlagCheckered,
    Sports: mdiFootball
};

function NavItem({
    children,
    icon,
    link
}: {
    children: ReactNode;
    icon: string;
    link: string;
}) {
    return (
        <a href={link} className="group flex items-center gap-3">
            <div className="rounded-md bg-[#202020] p-1.5 text-white transition-colors duration-400 group-hover:bg-white group-hover:text-black">
                <Icon path={icon} size={1.3} />
            </div>
            <li className="text-lg">{children}</li>
        </a>
    );
}

export default function Navbar() {
    return (
        <nav className="flex flex-col gap-8">
            <div>
                <ul>
                    <NavItem link="#" icon={mdiFire}>
                        Latest Games
                    </NavItem>
                </ul>
            </div>

            <div>
                <div className="mb-2 text-4xl font-bold">Genres</div>
                <ul className="flex flex-col gap-2">
                    {Object.entries(Genres).map(
                        ([genre, icon], index: number) => (
                            <NavItem key={index} link="#" icon={icon}>
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
                            <NavItem key={index} link="#" icon={icon}>
                                {platform}
                            </NavItem>
                        )
                    )}
                </ul>
            </div>
        </nav>
    );
}
