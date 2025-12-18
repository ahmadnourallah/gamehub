'use client';
import { deleteGenre, getGenres } from '@/actions/genre';
import type { GenreType } from '@/lib/types';
import { MRT_ColumnDef } from 'mantine-react-table';
import Button from '@/components/common/Button';
import DashTable from '@/components/dashboard/DashTable';
import Link from 'next/link';

const columns: MRT_ColumnDef<GenreType>[] = [
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'createdAt',
        header: 'Created at'
    }
];

export default function DashGenres() {
    return (
        <>
            <div className="mb-4 flex justify-between">
                <h1>Genres</h1>
                <Link href="/dashboard/genres/new">
                    <Button>New</Button>
                </Link>
            </div>
            <DashTable
                dataKey="genres"
                onDelete={deleteGenre}
                queryFn={getGenres}
                columns={columns}
            />
        </>
    );
}
