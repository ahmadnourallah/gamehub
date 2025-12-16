import { getPlatformGames } from '@/actions/platform';
import { notFound } from 'next/navigation';
import { convertParamToNum, paginate } from '@/lib/utils';
import GameList from '@/components/store/GameList';

export default async function PlatformGames({
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
    const response = await getPlatformGames(name, start, end);

    if (response.status === 'fail' && response.code === 404) notFound();
    else if (response.status === 'fail') throw new Error();
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
