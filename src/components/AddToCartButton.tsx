'use client';
import { useMutation } from '@tanstack/react-query';
import { addToCart } from '@/queries/cart';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { CartContext } from '@/context/CartContextProvider';

export default function AddToCartButton({
    isAdded,
    gameId,
    token,
    className
}: {
    isAdded: boolean;
    gameId: number;
    token: string | undefined;
    className?: string;
}) {
    const router = useRouter();
    const { dispatch } = useContext(CartContext);

    const { isPending, isError, isSuccess, error, data, mutate } = useMutation({
        mutationFn: async ({
            token,
            gameId
        }: {
            token: string;
            gameId: number;
        }) => {
            return await addToCart(token, gameId);
        }
    });

    if (isError) console.log(error);
    if (isSuccess) isAdded = true;

    useEffect(() => {
        if (isSuccess && data.status === 'success')
            dispatch({ type: 'ADD', payload: data.data.cart });
    }, [isSuccess, data, dispatch]);

    return (
        <button
            className={`${isPending ? 'opacity-40' : ''} ${className}`}
            disabled={isPending || isAdded}
            onClick={() => {
                if (token) mutate({ token: token, gameId });
                else router.push('/login');
            }}
        >
            {isAdded ? `Added ✓` : 'Add to cart +'}
        </button>
    );
}
