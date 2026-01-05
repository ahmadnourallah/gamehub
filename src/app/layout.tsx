import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import QueryProvider from '@/components/common/QueryProvider';
import localFont from 'next/font/local';
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
    title: 'GameHub',
    description: "All the games you're looking for in one place"
};

export default async function RootLayout({
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
                    <Toaster position="bottom-right" />
                    {children}
                </body>
            </html>
        </QueryProvider>
    );
}
