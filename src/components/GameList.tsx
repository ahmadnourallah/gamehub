import { GameType } from '@/queries/game';
import { auth } from '@/auth';
import GameCard from './GameCard';
import { CartItemType, getCart } from '@/queries/cart';

export default async function GameList({ games }: { games: GameType[] }) {
    const session = await auth();

    let cartItems: CartItemType[];
    if (session) {
        const response = await getCart(session.accessToken);
        if (response.status === 'success')
            cartItems = response.data.cart.cartItems;
    }

    return (
        <div className="grid h-max w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            {games.map((game) => (
                <GameCard
                    key={game.id}
                    id={game.id}
                    className="scaleOnHover"
                    title={game.title}
                    price={game.price}
                    thumbnail={game.images[0]}
                    isAdded={
                        session
                            ? cartItems.find((item) => item.gameId === game.id)
                                ? true
                                : false
                            : false
                    }
                    platforms={game.platforms}
                    token={session?.accessToken}
                />
            ))}
        </div>
    );
}
