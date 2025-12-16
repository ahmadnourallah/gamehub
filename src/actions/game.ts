import type {
    QueryAllResponseType,
    QueryResponseType,
    GameType,
    DeleteResponseType,
    UpdateResponseType
} from '@/lib/types';
import { fetchAPI } from '@/lib/utils';

export async function getGames(
    start: number = 0,
    end: number = 10,
    search: string = '',
    orderBy: 'date' | 'title' = 'date',
    order: 'asc' | 'desc' = 'desc'
): Promise<QueryAllResponseType<'games', GameType[]>> {
    return await fetchAPI(
        `/games?start=${start}&end=${end}&search=${search}&orderBy=${orderBy}&order=${order}`
    );
}

export async function getGame(
    id: string
): Promise<QueryResponseType<'game', GameType>> {
    return await fetchAPI(`/games/${id}`);
}

export async function deleteGame(
    id: string,
    token: string
): Promise<DeleteResponseType> {
    return await fetchAPI(`/games/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function updateGame(
    formData: FormData,
    token: string,
    gameId: string
): Promise<UpdateResponseType<'game', GameType>> {
    return await fetchAPI(`/games/${gameId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });
}

export async function addGame(
    formData: FormData,
    token: string
): Promise<UpdateResponseType<'game', GameType>> {
    return await fetchAPI(`/games`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });
}
