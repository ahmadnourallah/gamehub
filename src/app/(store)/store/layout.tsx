import { ReactNode } from 'react';
import { getGenres } from '@/actions/genre';
import { getPlatforms } from '@/actions/platform';
import Navbar from '@/components/store/Navbar';
import Header from '@/components/store/Header';

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
            <div className="relative container mx-auto flex h-full overflow-hidden px-4 pt-4">
                <Navbar
                    genreResponse={genreResponse}
                    platformResponse={platformResponse}
                />
                <div className="scrollbar-hidden relative h-full w-full overflow-x-auto px-6 pt-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
