'use server';
import type { QueryAllResponseType, GameType, PlatformType } from '@/lib/types';
import { fetchAPI } from '@/lib/utils';

export async function getPlatforms(): Promise<
    QueryAllResponseType<'platforms', PlatformType[]>
> {
    return await fetchAPI('/platforms');
}

export async function getPlatformGames(
    platformName: string,
    start: number = 0,
    end: number = 10,
    search: string = '',
    orderBy: 'date' | 'title' = 'date',
    order: 'asc' | 'desc' = 'desc'
): Promise<QueryAllResponseType<'games', GameType[]>> {
    return await fetchAPI(
        `/platforms/${platformName}/games?start=${start}&end=${end}&search=${search}&orderBy=${orderBy}&order=${order}`
    );
}
