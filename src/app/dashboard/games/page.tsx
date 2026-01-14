'use client';
import { deleteGame, getGames } from '@/actions/game';
import type { GameType } from '@/lib/types';
import { MRT_ColumnDef } from 'mantine-react-table';
import Button from '@/components/common/Button';
import DashTable from '@/components/dashboard/DashTable';
import Link from 'next/link';

const columns: MRT_ColumnDef<GameType>[] = [
    {
        accessorKey: 'title',
        header: 'Title'
    },
    {
        accessorKey: 'price',
        header: 'Price',
        enableSorting: false
    },
    {
        accessorKey: 'createdAt',
        header: 'Created at'
    }
];

export default function DashGames() {
    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <h1>Games</h1>
                <Link href="/dashboard/games/new">
                    <Button>New</Button>
                </Link>
            </div>
            <DashTable
                addActions={true}
                dataKey="games"
                onDelete={deleteGame}
                queryFn={getGames}
                columns={columns}
            />
        </>
    );
}
