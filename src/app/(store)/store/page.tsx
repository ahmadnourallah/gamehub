import GameList from '@/components/store/GameList';
import { getGames } from '@/queries/game';

export default async function Store() {
    const games = await getGames();

    return <GameList games={games} />;
}
