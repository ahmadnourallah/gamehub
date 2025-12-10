import { getGenreGames } from '@/queries/genre';
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
    const sParams = await searchParams;
    const page = sParams.page ? parseInt(sParams.page as string) : 1;
    const [start, end] = paginate(page, 9);

    const response = await getGenreGames(name, start, end);

    if (response.status === 'fail') notFound();
    else {
        return (
            <GameList
                pageSize={9}
                total={response.data.total || 0}
                games={response.data.games}
            />
        );
    }
}
