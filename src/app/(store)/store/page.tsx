import GameList from '@/components/store/GameList';
import { getGames } from '@/queries/game';

export default async function Store() {
    const gameResponse = await getGames();

    if (gameResponse.status === 'success')
        return <GameList games={gameResponse.data.games} />;
}
