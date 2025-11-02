import type { GameType } from './game';

export interface PlatformType {
    id: number;
    name: string;
    createdAt: string;
}

export async function getPlatformGames(
    platformName: string,
    start: number = 0,
    end: number = 10,
    search: string = '',
    orderBy: 'date' | 'title' = 'date',
    order: 'asc' | 'desc' = 'asc'
): Promise<GameType[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/platforms/${platformName}/games?start=${start}&end=${end}&search=${search}&orderby=${orderBy}&order=${order}`
    );

    if (!response.ok) throw new Error("Server isn't responding!");

    const data = await response.json();

    return data.data.games;
}
