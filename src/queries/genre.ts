import type { GameType } from './game';

export interface GenreType {
    id: number;
    name: string;
    createdAt: string;
}

export async function getGenreGames(
    genreName: string,
    start: number = 0,
    end: number = 10,
    search: string = '',
    orderBy: 'date' | 'title' = 'date',
    order: 'asc' | 'desc' = 'asc'
): Promise<GameType[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/genres/${genreName}/games?start=${start}&end=${end}&search=${search}&orderby=${orderBy}&order=${order}`
    );

    if (!response.ok) throw new Error("Server isn't responding!");

    const data = await response.json();

    return data.data.games;
}
