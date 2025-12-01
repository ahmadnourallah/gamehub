'use client';
import { useContext, useEffect, useState } from 'react';
import { mdiCartOutline } from '@mdi/js';
import { CartContext } from '@/context/CartContextProvider';
import { useOutsideClick } from '@/utils/hooks';
import { useMutation } from '@tanstack/react-query';
import { clearCart } from '@/queries/cart';
import { useSession } from 'next-auth/react';
import Slider from './Slider';
import CartItem from './CartItem';
import Icon from '@mdi/react';

interface KeyboardEvent {
    key: string;
}

export default function Cart() {
    const { cart, dispatch } = useContext(CartContext);
    const { data: session } = useSession();
    const [isActive, setIsActive] = useState(true);
    const ref = useOutsideClick(() => setIsActive(false));

    function handleExit(evt: KeyboardEvent) {
        if (evt.key === 'Escape') setIsActive(false);
    }

    const { mutate } = useMutation({
        mutationFn: async ({ token }: { token: string }) => {
            return await clearCart(token);
        }
    });

    useEffect(() => {
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
            <div
                className="tooltip relative flex items-center"
                data-tooltip="Cart"
            >
                <button
                    onClick={() => setIsActive(!isActive)}
                    className="scaleOnHover relative"
                >
                    <Icon
                        path={mdiCartOutline}
                        className="h-6 w-6 sm:h-8 sm:w-8"
                        color="#FFFFFF"
                    />
                    <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-[100%] bg-[#18B0AB] p-2 text-center text-xs font-bold">
                        {cart?.cartItems.length}
                    </div>
                </button>
            </div>

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
