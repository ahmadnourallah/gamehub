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
import toast from 'react-hot-toast';

interface KeyboardEvent {
    key: string;
}

export default function Cart() {
    const { cart, dispatch } = useContext(CartContext);
    const { data: session } = useSession();
    const close = () => setIsActive(false);
    const [isActive, setIsActive] = useState(false);
    const ref = useOutsideClick(close);

    const { mutate, isError, isSuccess, isPending } = useMutation({
        mutationFn: async ({ token }: { token: string }) => {
            const response = await clearCart(token);
            if (response.status === 'success') return response;
            else return Promise.reject(response.data);
        }
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success('Cart has been cleared successfully!');
            dispatch({ type: 'CLEAR' });
        }

        if (isError) toast.error('Cart cannot be cleared!');
    }, [isError, isSuccess, dispatch]);

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
                className={`${isActive ? 'block' : 'hidden'} fixed top-0 left-0 h-screen w-screen bg-black/50`}
            ></div>

            <Slider
                ref={ref}
                position="right"
                className="bg-gray-dark fixed! flex h-screen w-3/4 flex-col justify-between gap-4 p-8 md:w-2/5 lg:w-1/3"
                isActive={isActive}
            >
                <div className="flex justify-between">
                    <h2 className="text-2xl font-extrabold">
                        {cart?.cartItems.length} Games
                    </h2>
                    <button
                        disabled={!cart?.cartItems.length}
                        onClick={() => {
                            mutate({ token: session?.accessToken as string });
                        }}
                        className="text-text-primary disabled:text-[rgb(153,153,153,0.3)]"
                    >
                        Clear
                    </button>
                </div>

                <div className="scrollbar-hidden relative flex h-full flex-col gap-3 overflow-y-auto">
                    {cart?.cartItems.map((item, index) => (
                        <CartItem
                            isDisabled={isPending}
                            key={index}
                            token={session?.accessToken as string}
                            gameId={item.gameId}
                            price={item.price}
                            close={close}
                        />
                    ))}
                </div>

                <div className="text-md text-text-primary">
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
