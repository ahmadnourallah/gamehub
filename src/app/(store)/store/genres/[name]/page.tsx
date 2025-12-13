import { getGenreGames } from '@/actions/genre';
import { notFound } from 'next/navigation';
import { paginate } from '@/utils/misc';
import GameList from '@/components/store/GameList';

export default async function GenreGames({
    params,
    searchParams
}: {
    params: Promise<{ name: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { name } = await params;
    const [start, end, currentPage] = paginate((await searchParams).page, 9);
    const response = await getGenreGames(name, start, end);

    if (response.status === 'fail') notFound();
    else {
        return (
            <>
                <h1 className="mb-8 text-6xl font-bold">{name} Games</h1>

                <GameList
                    currentPage={currentPage}
                    pageSize={9}
                    total={response.data.total || 0}
                    games={response.data.games}
                />
            </>
        );
    }
}
