import type {
    QueryAllResponseType,
    QueryResponseType,
    DeleteResponseType,
    UpdateResponseType,
    PlatformType,
    GameType
} from '@/lib/types';
import { fetchAPI } from '@/lib/utils';

export async function createPlatform(
    formData: FormData,
    token: string
): Promise<UpdateResponseType<'platform', PlatformType>> {
    return await fetchAPI(`/platforms`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });
}

export async function getPlatform(
    name: string
): Promise<QueryResponseType<'platform', PlatformType>> {
    return await fetchAPI(`/platforms/${name}`);
}

export async function getPlatforms(
    start: number = 0,
    end: number = 10,
    search: string = '',
    orderBy: 'date' | 'title' = 'date',
    order: 'asc' | 'desc' = 'desc'
): Promise<QueryAllResponseType<'platforms', PlatformType[]>> {
    return await fetchAPI(
        `/platforms?start=${start}&end=${end}&search=${search}&orderBy=${orderBy}&order=${order}`
    );
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

export async function updatePlatform(
    formData: FormData,
    token: string,
    name: string
): Promise<UpdateResponseType<'platform', PlatformType>> {
    return await fetchAPI(`/platforms/${name}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });
}

export async function deletePlatform(
    name: string,
    token: string
): Promise<DeleteResponseType> {
    return await fetchAPI(`/platforms/${name}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
