import { getGame } from '@/queries/game';
import { CartItemType, getCart } from '@/queries/cart';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import PreviewCarousel from '@/components/PreviewCarousel';
import GameDetails from '@/components/GameDetails';
import AddToCartButton from '@/components/AddToCartButton';

export default async function Game({
    params
}: {
    params: Promise<{ id: number }>;
}) {
    const session = await auth();

    const { id } = await params;
    const response = await getGame(id);

    let cartItems: CartItemType[];

    if (response.status === 'fail') notFound();
    else {
        const game = response.data.game;

        let isAdded = false;
        if (session) {
            const cartResponse = await getCart(session.accessToken);
            if (cartResponse.status === 'success') {
                cartItems = cartResponse.data.cart.cartItems;

                isAdded = cartItems.find((item) => item.gameId === game.id)
                    ? true
                    : false;
            }
        }

        return (
            <div className="w-full">
                <h1 className="mb-10 text-5xl font-bold">{game.title}</h1>
                <PreviewCarousel images={game.images} />

                <GameDetails game={game} />

                <div className="mt-4 flex justify-between rounded-lg bg-[#202020] p-4">
                    <div className="text-lg font-bold">${game.price}</div>
                    <AddToCartButton
                        token={session?.accessToken}
                        gameId={game.id}
                        isAdded={isAdded}
                        className="text-2xl font-bold text-[rgb(24,176,171)]"
                    />
                </div>
            </div>
        );
    }
}
