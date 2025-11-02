import { getGenreGames } from '@/queries/genre';
import GameList from '@/components/GameList';

export default async function GenreGames({
    params
}: {
    params: Promise<{ name: string }>;
}) {
    const { name } = await params;
    const games = await getGenreGames(name);

    return <GameList games={games} />;
}
