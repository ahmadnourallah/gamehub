import { ReactNode } from 'react';
import { getGenres } from '@/queries/genre';
import { getPlatforms } from '@/queries/platform';
import Navbar from '@/components/Navbar';

export default async function StoreLayout({
    children
}: {
    children: ReactNode;
}) {
    const genreResponse = await getGenres();
    const platformResponse = await getPlatforms();

    return (
        <div className="relative container mx-auto flex gap-20 overflow-x-clip p-4">
            <Navbar
                genreResponse={genreResponse}
                platformResponse={platformResponse}
            />
            {children}
        </div>
    );
}
