'use server';
import type { ResponseType, GameType, PlatformType } from '@/lib/types';

export async function getPlatforms(): Promise<
    ResponseType<'platforms', PlatformType[]>
> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/platforms`);

    if (!response.ok && response.status !== 404)
        throw new Error("Server isn't responding!");

    return await response.json();
}

export async function getPlatformGames(
    platformName: string,
    start: number = 0,
    end: number = 10,
    search: string = '',
    orderBy: 'date' | 'title' = 'date',
    order: 'asc' | 'desc' = 'desc'
): Promise<ResponseType<'games', GameType[]>> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/platforms/${platformName}/games?start=${start}&end=${end}&search=${search}&orderBy=${orderBy}&order=${order}`
    );

    if (!response.ok && response.status !== 404)
        throw new Error("Server isn't responding!");

    return await response.json();
}
