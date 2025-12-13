import {
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
    mdiAndroid,
    mdiGamepadVariant,
    mdiConsole,
    mdiPenguin
} from '@mdi/js';

const Platforms = {
    pc: mdiMicrosoftWindows,
    playstation: mdiSonyPlaystation,
    xbox: mdiMicrosoftXbox,
    nintendo: mdiNintendoSwitch,
    ios: mdiAppleIos,
    android: mdiAndroid,
    linux: mdiPenguin
};

const Genres = {
    action: mdiBoxingGlove,
    strategy: mdiChessRook,
    rpg: mdiSwordCross,
    shooter: mdiPistol,
    adventure: mdiPyramid,
    puzzle: mdiPuzzle,
    racing: mdiFlagCheckered,
    sports: mdiFootball
};

const getIcon = (
    iconObject: { [k: string]: string },
    iconName: string
): string => iconObject[iconName.toLowerCase()];

export const getPlatformIcon = (icon: string) =>
    getIcon(Platforms, icon) || mdiConsole;

export const getGenreIcon = (icon: string) =>
    getIcon(Genres, icon) || mdiGamepadVariant;
