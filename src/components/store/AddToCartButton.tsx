'use client';
import { useMutation } from '@tanstack/react-query';
import { addToCart } from '@/actions/cart';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { CartContext } from '@/context/CartContextProvider';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

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

    const { isPending, isError, isSuccess, data, mutate } = useMutation({
        mutationFn: async ({
            token,
            gameId
        }: {
            token: string;
            gameId: number;
        }) => {
            const response = await addToCart(token, gameId);
            if (response.status === 'fail')
                return Promise.reject(response.data);
            else return response;
        }
    });

    useEffect(() => {
        if (isSuccess && data.status === 'success') {
            toast.success('Item added successfully!');
            dispatch({ type: 'ADD', payload: data.data.cart });
        }

        if (isError) toast.error('Item cannot be added!');
    }, [isSuccess, isError, data, dispatch]);

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
