'use client';
import { useMutation } from '@tanstack/react-query';
import { addToCart } from '@/actions/cart';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { CartContext } from '@/context/CartContextProvider';
import { useSession } from 'next-auth/react';

export default function AddToCartButton({
    gameId,
    className
}: {
    gameId: number;
    className?: string;
}) {
    const { cart, dispatch } = useContext(CartContext);
    const { data: session } = useSession();
    const router = useRouter();
    const isAdded = cart?.cartItems.find((item) => item.gameId === gameId)
        ? true
        : false;

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

    useEffect(() => {
        if (isSuccess && data.status === 'success')
            dispatch({ type: 'ADD', payload: data.data.cart });
    }, [isSuccess, data, dispatch]);

    return (
        <button
            className={`${isPending ? 'opacity-40' : ''} ${className}`}
            disabled={isPending || isAdded}
            onClick={(e) => {
                e.stopPropagation();
                if (session) mutate({ token: session.accessToken, gameId });
                else router.push('/login');
            }}
        >
            {isAdded ? `Added ✓` : 'Add to cart +'}
        </button>
    );
}
