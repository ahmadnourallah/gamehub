'use server';
import type { GameType, ResponseType } from './game';

export interface GenreType {
    id: number;
    name: string;
    createdAt: string;
}

export async function getGenres(): Promise<
    ResponseType<'genres', GenreType[]>
> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/genres`);

    if (!response.ok && response.status !== 404)
        throw new Error("Server isn't responding!");

    return await response.json();
}

export async function getGenreGames(
    genreName: string,
    start: number = 0,
    end: number = 10,
    search: string = '',
    orderBy: 'date' | 'title' = 'date',
    order: 'asc' | 'desc' = 'desc'
): Promise<ResponseType<'games', GameType[]>> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/genres/${genreName}/games?start=${start}&end=${end}&search=${search}&orderBy=${orderBy}&order=${order}`
    );

    if (!response.ok && response.status !== 404)
        throw new Error("Server isn't responding!");

    return await response.json();
}
