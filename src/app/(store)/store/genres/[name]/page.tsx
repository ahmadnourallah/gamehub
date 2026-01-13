import { getGenreGames } from '@/actions/genre';
import { notFound } from 'next/navigation';
import { convertParamToNum, paginate } from '@/lib/utils';
import type { Metadata } from 'next';
import GameList from '@/components/store/GameList';

export async function generateMetadata({
    params
}: {
    params: Promise<{ name: string }>;
}): Promise<Metadata> {
    const { name } = await params;

    return {
        title: `GameHub - ${name}`,
        description: `Check out all the latest games in ${name}...`
    };
}

export default async function GenreGames({
    params,
    searchParams
}: {
    params: Promise<{ name: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { name } = await params;
    const [start, end, currentPage] = paginate(
        convertParamToNum((await searchParams).page),
        9
    );
    const response = await getGenreGames(name, start, end);

    if (response.status === 'fail' && response.code === 404) notFound();
    else if (response.status === 'fail') throw new Error();
    else {
        return (
            <>
                <h1 className="mb-8">{name} Games</h1>

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
