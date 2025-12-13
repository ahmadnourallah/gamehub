import { getGames } from '@/actions/game';
import { paginate } from '@/utils/misc';
import GameList from '@/components/store/GameList';

export default async function Store({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const [start, end, currentPage] = paginate((await searchParams).page, 9);
    const gameResponse = await getGames(start, end);

    if (gameResponse.status === 'success')
        return (
            <>
                <h1 className="mb-8 text-6xl font-bold">Latest Games</h1>
                <GameList
                    currentPage={currentPage}
                    pageSize={9}
                    total={gameResponse.data.total || 0}
                    games={gameResponse.data.games}
                />
            </>
        );
}
