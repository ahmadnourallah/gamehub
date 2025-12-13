'use server';
import type { QueryAllResponseType, GameType, GenreType } from '@/lib/types';
import { fetchAPI } from '@/lib/utils';

export async function getGenres(): Promise<
    QueryAllResponseType<'genres', GenreType[]>
> {
    return await fetchAPI('/genres');
}

export async function getGenreGames(
    genreName: string,
    start: number = 0,
    end: number = 10,
    search: string = '',
    orderBy: 'date' | 'title' = 'date',
    order: 'asc' | 'desc' = 'desc'
): Promise<QueryAllResponseType<'games', GameType[]>> {
    return await fetchAPI(
        `/genres/${genreName}/games?start=${start}&end=${end}&search=${search}&orderBy=${orderBy}&order=${order}`
    );
}
