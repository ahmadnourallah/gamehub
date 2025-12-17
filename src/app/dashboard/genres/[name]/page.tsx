import { getGenre } from '@/actions/genre';
import { notFound } from 'next/navigation';
import { GenreEditor } from '@/components/dashboard/Editors';

export default async function EditGenre({
    params
}: {
    params: Promise<{ name: string }>;
}) {
    const { name } = await params;

    const response = await getGenre(name);

    if (response.status === 'fail' && response.code === 404) notFound();
    else if (response.status === 'fail') throw new Error();
    else {
        return <GenreEditor genre={response.data.genre} />;
    }
}
