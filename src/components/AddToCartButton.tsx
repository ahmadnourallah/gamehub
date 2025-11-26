'use client';
import { useMutation } from '@tanstack/react-query';
import { addToCart } from '@/queries/cart';
import { useRouter } from 'next/navigation';

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

    const { isPending, isError, isSuccess, error, mutate } = useMutation({
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
