'use client';
import { MRT_ColumnDef } from 'mantine-react-table';
import { CartType } from '@/lib/types';
import { getCarts } from '@/actions/cart';
import { useSession } from 'next-auth/react';
import DashTable from '@/components/dashboard/DashTable';

const columns: MRT_ColumnDef<CartType>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
        enableSorting: false
    },
    {
        accessorKey: 'user.name',
        header: 'Username',
        enableSorting: false
    },
    {
        id: 'total',
        header: 'Total',
        accessorFn: (row) =>
            row.cartItems &&
            row.cartItems.reduce((total, item) => total + item.price, 0),
        enableSorting: false
    },

    {
        accessorKey: 'createdAt',
        header: 'Created at',
        enableSorting: false
    }
];

export default function DashCarts() {
    const { data: session } = useSession();

    return (
        <>
            <h1 className="mb-4">Carts</h1>
            <DashTable
                addActions={false}
                columns={columns}
                queryFn={async (start, end) =>
                    await getCarts(start, end, session?.accessToken || '')
                }
                dataKey="carts"
            />
        </>
    );
}
