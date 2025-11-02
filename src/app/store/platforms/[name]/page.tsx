import { getPlatformGames } from '@/queries/platform';
import GameList from '@/components/GameList';

export default async function PlatformGames({
    params
}: {
    params: Promise<{ name: string }>;
}) {
    const { name } = await params;
    const games = await getPlatformGames(name);

    return <GameList games={games} />;
}
