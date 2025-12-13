'use client';
import { useContext, useEffect, useState } from 'react';
import { mdiCartOutline } from '@mdi/js';
import { CartContext } from '@/context/CartContextProvider';
import { useOutsideClick } from '@/lib/hooks';
import { useMutation } from '@tanstack/react-query';
import { clearCart } from '@/actions/cart';
import { useSession } from 'next-auth/react';
import Slider from '@/components/common/Slider';
import CartItem from '@/components/store/CartItem';
import IconButton from '@/components/common/IconButton';

interface KeyboardEvent {
    key: string;
}

export default function Cart() {
    const { cart, dispatch } = useContext(CartContext);
    const { data: session } = useSession();
    const close = () => setIsActive(false);
    const [isActive, setIsActive] = useState(false);
    const ref = useOutsideClick(close);

    const { mutate } = useMutation({
        mutationFn: async ({ token }: { token: string }) => {
            return await clearCart(token);
        }
    });

    useEffect(() => {
        const handleExit = (evt: KeyboardEvent) =>
            evt.key === 'Escape' && close();

        if (isActive) {
            document.body.classList.add('overflow-y-hidden');
            document.body.addEventListener('keydown', handleExit);
        } else {
            document.body.classList.remove('overflow-y-hidden');
            document.body.removeEventListener('keydown', handleExit);
        }

        return () => {
            document.body.classList.remove('overflow-y-hidden');
            document.body.removeEventListener('keydown', handleExit);
        };
    }, [isActive]);

    return (
        <>
            <IconButton
                iconPath={mdiCartOutline}
                tooltip="Cart"
                badge={cart?.cartItems.length.toString()}
                onClick={() => setIsActive(!isActive)}
            />

            <div
                className={`${isActive ? 'block' : 'hidden'} fixed top-0 left-0 h-screen w-screen bg-[rgb(0,0,0,.5)]`}
            ></div>

            <Slider
                ref={ref}
                position="right"
                className="fixed! flex h-screen w-1/2 flex-col justify-between gap-4 bg-[rgb(32,32,32)] p-8 md:w-2/5 lg:w-1/3"
                isActive={isActive}
            >
                <div className="flex justify-between">
                    <h2 className="text-2xl font-extrabold">
                        {cart?.cartItems.length} Games
                    </h2>
                    <button
                        onClick={() => {
                            mutate({ token: session?.accessToken as string });
                            dispatch({ type: 'CLEAR' });
                        }}
                        className="text-[rgb(153,153,153)]"
                    >
                        Clear
                    </button>
                </div>

                <div className="scrollbar-hidden flex h-full flex-col gap-3 overflow-y-auto">
                    {cart?.cartItems.map((item, index) => (
                        <CartItem
                            key={index}
                            token={session?.accessToken as string}
                            gameId={item.gameId}
                            price={item.price}
                            close={close}
                        />
                    ))}
                </div>

                <div className="text-md text-[rgb(153,153,153)]">
                    Total: $
                    {cart?.cartItems.reduce(
                        (total, item) => item.price + total,
                        0
                    )}
                </div>
            </Slider>
        </>
    );
}
