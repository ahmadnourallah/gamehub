import { getGame } from '@/actions/game';
import { useQuery, useMutation } from '@tanstack/react-query';
import { mdiCloseCircle } from '@mdi/js';
import { deleteCartItem } from '@/actions/cart';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContextProvider';
import Link from 'next/link';
import shimmer from '@/utils/shimmer';
import Image from 'next/image';
import Icon from '@mdi/react';

export default function CartItem({
    gameId,
    price,
    token,
    close
}: {
    gameId: number;
    price: number;
    token: string;
    close: VoidFunction;
}) {
    const { dispatch } = useContext(CartContext);

    const gameQuery = useQuery({
        queryKey: [gameId],
        queryFn: async () => await getGame(gameId)
    });

    const deleteMutation = useMutation({
        mutationFn: async ({
            token,
            gameId
        }: {
            token: string;
            gameId: number;
        }) => {
            return await deleteCartItem(token, gameId);
        }
    });

    if (gameQuery.isPending) {
        return (
            <div className="h-[137px] rounded-lg bg-[rgb(38,38,38)] text-white">
                <Image
                    className="h-full w-full rounded-lg"
                    src={`data:image/svg+xml;base64,${shimmer()}`}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                />
            </div>
        );
    }

    if (gameQuery.isSuccess && gameQuery.data.status === 'success') {
        const game = gameQuery.data.data.game;

        return (
            <div className="flex flex-col gap-4 rounded-lg bg-[rgb(38,38,38)] p-4">
                <button
                    onClick={() => {
                        deleteMutation.mutate({ token, gameId });
                        dispatch({ type: 'DELETE', payload: gameId });
                    }}
                    className="self-end"
                >
                    <Icon path={mdiCloseCircle} size={0.9} />
                </button>

                <Link onClick={close} href={`/store/games/${gameId}`}>
                    <div className="flex flex-col justify-between gap-4 sm:flex-row">
                        <Image
                            className="h-auto w-full rounded-lg sm:w-30"
                            placeholder={`data:image/svg+xml;base64,${shimmer()}`}
                            src={
                                game.images[0]
                                    ? `${process.env.NEXT_PUBLIC_API}/${game.images[0]}`
                                    : '/default.jpg'
                            }
                            alt=""
                            width={0}
                            height={0}
                            sizes="100vw"
                        />
                        <div className="flex flex-col items-end justify-center text-left">
                            <p className="line-clamp-1" title={game.title}>
                                {game.title}
                            </p>
                            <p className="text-[rgb(153,153,153)]">${price}</p>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}
