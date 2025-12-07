import { getGenreGames } from '@/queries/genre';
import { notFound } from 'next/navigation';
import GameList from '@/components/store/GameList';

export default async function GenreGames({
    params
}: {
    params: Promise<{ name: string }>;
}) {
    const { name } = await params;
    const response = await getGenreGames(name);

    if (response.status === 'fail') notFound();
    else {
        const games = response.data.games;
        return <GameList games={games} />;
    }
}
