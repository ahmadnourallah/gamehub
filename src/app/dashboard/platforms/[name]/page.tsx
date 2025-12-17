import { getPlatform } from '@/actions/platform';
import { notFound } from 'next/navigation';
import { PlatformEditor } from '@/components/dashboard/Editors';

export default async function EditPlatform({
    params
}: {
    params: Promise<{ name: string }>;
}) {
    const { name } = await params;

    const response = await getPlatform(name);

    if (response.status === 'fail' && response.code === 404) notFound();
    else if (response.status === 'fail') throw new Error();
    else {
        return <PlatformEditor platform={response.data.platform} />;
    }
}
