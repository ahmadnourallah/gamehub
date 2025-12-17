import { getGame } from '@/actions/game';
import { notFound } from 'next/navigation';
import { GameEditor } from '@/components/dashboard/Editors';

export default async function EditGame({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const response = await getGame(id);

    if (response.status === 'fail' && response.code === 404) notFound();
    else if (response.status === 'fail') throw new Error();
    else {
        return <GameEditor game={response.data.game} />;
    }
}
