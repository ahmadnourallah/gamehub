import { getPlatformGames } from '@/queries/platform';
import { notFound } from 'next/navigation';
import GameList from '@/components/GameList';

export default async function PlatformGames({
    params
}: {
    params: Promise<{ name: string }>;
}) {
    const { name } = await params;
    const response = await getPlatformGames(name);

    if (response.status === 'fail') notFound();
    else {
        const games = response.data.games;
        return <GameList games={games} />;
    }
}
