import { ResponseType } from './game';

export interface CartItemType {
    cartId: number;
    gameId: number;
    quantity: number;
    price: number;
}

export interface CartType {
    id: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    cartItems: CartItemType[];
}

export async function addToCart(
    token: string,
    gameId: number
): Promise<ResponseType<'cart', CartType>> {
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
): Promise<ResponseType<'cart', CartType>> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/cart`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok && response.status !== 404)
        throw new Error("Server isn't responding!");

    return await response.json();
}

export async function clearCart(
    token: string
): Promise<ResponseType<'data', null>> {
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
): Promise<ResponseType<'data', null>> {
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
