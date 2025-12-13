'use server';
import type {
    UpdateResponseType,
    QueryResponseType,
    CartType,
    DeleteResponseType
} from '@/lib/types';

export async function addToCart(
    token: string,
    gameId: number
): Promise<UpdateResponseType<'cart', CartType>> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ gameId })
    });

    if (!response.ok) {
        const data = await response.json();

        throw new Error(
            data.data
                ? data.data
                      .map((err: { [key: string]: string }) =>
                          Object.values(err)
                      )
                      .join('\n')
                : "Server isn't responding"
        );
    }

    return response.json();
}

export async function getCart(
    token: string
): Promise<QueryResponseType<'cart', CartType>> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/cart`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok && response.status !== 404)
        throw new Error("Server isn't responding!");

    return await response.json();
}

export async function clearCart(token: string): Promise<DeleteResponseType> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/cart`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok && response.status !== 404)
        throw new Error("Server isn't responding!");

    return await response.json();
}

export async function deleteCartItem(
    token: string,
    gameId: number
): Promise<DeleteResponseType> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/cart/${gameId}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok && response.status !== 404)
        throw new Error("Server isn't responding!");

    return await response.json();
}
