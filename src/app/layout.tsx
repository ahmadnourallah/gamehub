import type { Metadata } from 'next';
import { mdiLogin } from '@mdi/js';
import QueryProvider from '@/components/QueryProvider';
import localFont from 'next/font/local';
import Link from 'next/link';
import Icon from '@mdi/react';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import Cart from '@/components/Cart';
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

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <QueryProvider>
            <html lang="en" className={GTWalsheimPro.className}>
                <head>
                    <link rel="icon" href="/favicon.ico" sizes="any" />
                </head>
                <body>
                    <header className="relative z-10 container mx-auto flex items-center justify-between gap-4 p-4">
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

                        <div className="flex items-center">
                            <a
                                href="#"
                                data-tooltip="Login"
                                className="tooltip relative mr-2 border-r-2 border-r-white pr-2"
                            >
                                <Icon
                                    className="scaleOnHover h-5 w-5 sm:h-6 sm:w-6"
                                    path={mdiLogin}
                                />
                            </a>

                            <Cart />
                        </div>
                    </header>
                    {children}
                </body>
            </html>
        </QueryProvider>
    );
}
