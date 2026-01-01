import type {
    QueryAllResponseType,
    QueryResponseType,
    UpdateResponseType,
    DeleteResponseType,
    CartType
} from '@/lib/types';
import { fetchAPI } from '@/lib/utils';

export async function getCarts(
    start: number = 0,
    end: number = 10,
    token: string
): Promise<QueryAllResponseType<'carts', CartType[]>> {
    return await fetchAPI(`/cart/all?start=${start}&end=${end}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function addToCart(
    token: string,
    gameId: number
): Promise<UpdateResponseType<'cart', CartType>> {
    return await fetchAPI('/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ gameId })
    });
}

export async function getCart(
    token: string
): Promise<QueryResponseType<'cart', CartType>> {
    return await fetchAPI('/cart', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function clearCart(token: string): Promise<DeleteResponseType> {
    return await fetchAPI('/cart', {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function deleteCartItem(
    token: string,
    gameId: number
): Promise<DeleteResponseType> {
    return await fetchAPI(`/cart/${gameId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
