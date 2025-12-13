import { CartContextProvider } from '@/context/CartContextProvider';
import { auth } from '@/auth';
import { getCart } from '@/actions/cart';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export default async function StoreLayout({
    children
}: {
    children: ReactNode;
}) {
    const session = await auth();
    let initialCart;
    if (session) {
        const response = await getCart(session.accessToken);
        if (response.status === 'success') initialCart = response.data.cart;
    }

    return (
        <SessionProvider>
            <CartContextProvider initialCart={initialCart}>
                {children}
            </CartContextProvider>
        </SessionProvider>
    );
}
