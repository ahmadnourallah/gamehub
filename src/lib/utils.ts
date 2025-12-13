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
import type { FailureResponseType } from '@/lib/types';

const PlatformIcons = {
    pc: mdiMicrosoftWindows,
    playstation: mdiSonyPlaystation,
    xbox: mdiMicrosoftXbox,
    nintendo: mdiNintendoSwitch,
    ios: mdiAppleIos,
    android: mdiAndroid,
    linux: mdiPenguin
};

const GenreIcons = {
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
    getIcon(PlatformIcons, icon) || mdiConsole;

export const getGenreIcon = (icon: string) =>
    getIcon(GenreIcons, icon) || mdiGamepadVariant;

const toBase64 = (str: string) =>
    typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str);

export const shimmer = (w: number = 20, h: number = 20) =>
    toBase64(`
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#333" offset="20%" />
          <stop stop-color="#222" offset="50%" />
          <stop stop-color="#333" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#333" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`);

export function paginate(
    pageParam: string | string[] | undefined,
    pageSize: number
): [start: number, end: number, currentPage: number] {
    let page;

    if (Array.isArray(pageParam)) pageParam = pageParam[0];

    if (typeof pageParam === 'string' && parseInt(pageParam))
        page = Math.abs(parseInt(pageParam));
    else page = 1;

    const start = page > 1 ? (page - 1) * pageSize + 1 : (page - 1) * pageSize;
    const end = (page - 1) * pageSize + pageSize;

    return [start, end, page];
}

export async function fetchAPI(
    resource: string,
    options?: RequestInit,
    API: string | undefined = process.env.NEXT_PUBLIC_API
) {
    try {
        const response = await fetch(`${API}${resource}`, options);

        return response.json();
    } catch (error) {
        if (error instanceof Error)
            return {
                status: 'fail',
                code: 503,
                data: { network: error.message }
            } as FailureResponseType;
    }
}
