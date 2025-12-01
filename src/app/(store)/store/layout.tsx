import { ReactNode } from 'react';
import { getGenres } from '@/queries/genre';
import { getPlatforms } from '@/queries/platform';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';

export default async function StoreLayout({
    children
}: {
    children: ReactNode;
}) {
    const genreResponse = await getGenres();
    const platformResponse = await getPlatforms();

    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <Header />
            <div className="relative container mx-auto flex overflow-hidden px-4 pt-4">
                <Navbar
                    genreResponse={genreResponse}
                    platformResponse={platformResponse}
                />
                <div className="scrollbar-hidden h-full w-full overflow-x-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
