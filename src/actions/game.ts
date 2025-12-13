'use server';
import type {
    QueryAllResponseType,
    QueryResponseType,
    GameType,
    DeleteResponseType
} from '@/lib/types';

export async function getGames(
    start: number = 0,
    end: number = 10,
    search: string = '',
    orderBy: 'date' | 'title' = 'date',
    order: 'asc' | 'desc' = 'desc'
): Promise<QueryAllResponseType<'games', GameType[]>> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/games?start=${start}&end=${end}&search=${search}&orderBy=${orderBy}&order=${order}`
    );

    if (!response.ok && response.status !== 404)
        throw new Error("Server isn't responding!");

    return await response.json();
}

export async function getGame(
    id: number
): Promise<QueryResponseType<'game', GameType>> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/games/${id}`);

    if (!response.ok && response.status !== 404)
        throw new Error("Server isn't responding!");

    return await response.json();
}

export async function deleteGame(
    id: string,
    token: string
): Promise<DeleteResponseType> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/games/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok && response.status !== 404)
        throw new Error("Server isn't responding!");

    return await response.json();
}
