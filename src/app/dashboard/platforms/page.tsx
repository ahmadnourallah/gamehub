'use client';
import { deletePlatform, getPlatforms } from '@/actions/platform';
import type { PlatformType } from '@/lib/types';
import { MRT_ColumnDef } from 'mantine-react-table';
import Button from '@/components/common/Button';
import DashTable from '@/components/dashboard/DashTable';
import Link from 'next/link';

const columns: MRT_ColumnDef<PlatformType>[] = [
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'createdAt',
        header: 'Created at'
    }
];

export default function DashPlatforms() {
    return (
        <>
            <div className="mb-4 flex justify-between">
                <h1>Platforms</h1>
                <Link href="/dashboard/platforms/new">
                    <Button>New</Button>
                </Link>
            </div>
            <DashTable
                addActions={true}
                dataKey="platforms"
                onDelete={deletePlatform}
                queryFn={getPlatforms}
                columns={columns}
            />
        </>
    );
}
