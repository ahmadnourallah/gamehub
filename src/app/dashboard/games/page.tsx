import { deleteGame, getGames } from '@/actions/game';
import type { GameType } from '@/lib/types';
import { MRT_ColumnDef } from 'mantine-react-table';
import Button from '@/components/common/Button';
import DashTable from '@/components/dashboard/DashTable';

export default function DashGames() {
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

    return (
        <>
            <div className="mb-4 flex justify-between">
                <h1 className="text-4xl font-bold">Games</h1>
                <Button>New</Button>
            </div>
            <DashTable
                onDelete={deleteGame}
                queryFn={getGames}
                dataKey="games"
                columns={columns}
            />
        </>
    );
}
