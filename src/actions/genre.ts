import type {
    QueryAllResponseType,
    QueryResponseType,
    DeleteResponseType,
    UpdateResponseType,
    GameType,
    GenreType
} from '@/lib/types';
import { fetchAPI } from '@/lib/utils';

export async function createGenre(
    formData: FormData,
    token: string
): Promise<UpdateResponseType<'genre', GenreType>> {
    return await fetchAPI('/genres', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });
}

export async function getGenre(
    name: string
): Promise<QueryResponseType<'genre', GenreType>> {
    return await fetchAPI(`/genres/${name}`);
}

export async function getGenres(
    start: number = 0,
    end: number = 10,
    search: string = '',
    orderBy: 'date' | 'title' = 'date',
    order: 'asc' | 'desc' = 'desc'
): Promise<QueryAllResponseType<'genres', GenreType[]>> {
    return await fetchAPI(
        `/genres?start=${start}&end=${end}&search=${search}&orderBy=${orderBy}&order=${order}`
    );
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

export async function updateGenre(
    formData: FormData,
    token: string,
    name: string
): Promise<UpdateResponseType<'genre', GenreType>> {
    return await fetchAPI(`/genres/${name}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });
}

export async function deleteGenre(
    name: string,
    token: string
): Promise<DeleteResponseType> {
    return await fetchAPI(`/genres/${name}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
