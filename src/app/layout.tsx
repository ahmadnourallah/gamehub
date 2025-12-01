import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { CartContextProvider } from '@/context/CartContextProvider';
import { getCart } from '@/queries/cart';
import { auth } from '@/auth';
import QueryProvider from '@/components/QueryProvider';
import localFont from 'next/font/local';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import Control from '@/components/Control';
import './globals.css';

const GTWalsheimPro = localFont({
    src: [
        {
            path: '../../public/GTWalsheimProRegular.woff2',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../../public/GTWalsheimProBold.woff2',
            weight: '900',
            style: 'normal'
        }
    ]
});

export const metadata: Metadata = {
    title: 'Game Store',
    description: "All the games you're looking for in one place"
};

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    let initialCart;
    if (session) {
        const response = await getCart(session.accessToken);
        if (response.status === 'success') initialCart = response.data.cart;
    }

    return (
        <QueryProvider>
            <SessionProvider>
                <CartContextProvider initialCart={initialCart}>
                    <html lang="en" className={GTWalsheimPro.className}>
                        <head>
                            <link rel="icon" href="/favicon.ico" sizes="any" />
                        </head>
                        <body>
                            <Toaster position="bottom-right" />
                            <header className="relative z-100 container mx-auto flex items-center justify-between gap-4 p-4">
                                <Link
                                    href="/"
                                    className="scaleOnHover flex cursor-pointer items-center gap-2"
                                >
                                    <Image
                                        src="/logo.png"
                                        width={45}
                                        height={45}
                                        alt=""
                                    />
                                    <span className="hidden text-3xl font-medium sm:block">
                                        Game Store
                                    </span>
                                </Link>

                                <SearchBar />

                                <Control />
                            </header>
                            {children}
                        </body>
                    </html>
                </CartContextProvider>
            </SessionProvider>
        </QueryProvider>
    );
}
