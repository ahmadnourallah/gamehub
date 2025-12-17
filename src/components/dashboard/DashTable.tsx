'use client';
import { useState } from 'react';
import {
    MantineReactTable,
    useMantineReactTable,
    type MRT_ColumnDef,
    type MRT_PaginationState,
    type MRT_SortingState
} from 'mantine-react-table';
import { ActionIcon, MantineProvider, Tooltip } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type {
    QueryAllResponseType,
    DeleteResponseType,
    GameType,
    GenreType,
    PlatformType
} from '@/lib/types';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { paginate } from '@/lib/utils';
import toast from 'react-hot-toast';
import 'mantine-react-table/styles.css';
import '@mantine/core/styles.layer.css';

type QueryFunction<DataKey extends string, DataType> = (
    start: number,
    end: number,
    search: string,
    orderBy: 'title' | 'date',
    order: 'asc' | 'desc'
) => Promise<QueryAllResponseType<DataKey, DataType[]>>;

/* eslint-disable  @typescript-eslint/no-explicit-any */
interface DashProps<
    DataKey extends string,
    DataType extends Record<string, any>
> {
    columns: MRT_ColumnDef<DataType>[];
    queryFn: QueryFunction<DataKey, DataType>;
    dataKey: DataKey;
    onDelete: (
        identifier: string,
        token: string
    ) => Promise<DeleteResponseType>;
}

export default function DashTable<
    DataKey extends string,
    DataType extends GameType | GenreType | PlatformType
>({ columns, queryFn, dataKey, onDelete }: DashProps<DataKey, DataType>) {
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });
    const router = useRouter();
    const pathname = usePathname();
    const { data: session } = useSession();

    const [start, end] = paginate(
        pagination.pageIndex + 1,
        pagination.pageSize
    );

    const { data, isError, isFetching, isLoading, refetch } = useQuery({
        queryKey: [dataKey, pagination, globalFilter, sorting],
        queryFn: async () => {
            const response = await queryFn(
                start,
                end,
                globalFilter,
                sorting.length > 0
                    ? sorting[0].id === 'title'
                        ? 'title'
                        : 'date'
                    : 'date',
                sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : 'desc'
            );

            if (response.status === 'success') return response;
            else return Promise.reject(response.data);
        },
        placeholderData: keepPreviousData,
        refetchOnMount: 'always',
        refetchOnWindowFocus: false
    });

    const table = useMantineReactTable({
        columns,
        data: data?.status === 'success' ? data.data[dataKey] : [],
        enableColumnFilters: false,
        manualPagination: true,
        mantinePaginationProps: {
            rowsPerPageOptions: ['5', '10', '20', '30'] // Must be compatible with API's limit
        },
        manualSorting: true,
        mantineToolbarAlertBannerProps: isError
            ? {
                  color: 'red',
                  children: 'Error loading data'
              }
            : undefined,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        renderTopToolbarCustomActions: () => (
            <Tooltip label="Refresh Data">
                <ActionIcon onClick={() => refetch()}>
                    <IconRefresh />
                </ActionIcon>
            </Tooltip>
        ),
        rowCount: data?.status === 'success' ? data.data.total : 0,
        state: {
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isFetching,
            sorting
        },
        enableRowActions: true,
        renderRowActions: ({ row }) => (
            <div className="flex gap-2">
                <button
                    onClick={() =>
                        router.push(
                            `${pathname}/${'title' in row.original ? row.original.id : row.original.name}`
                        )
                    }
                    className="rounded-sm bg-blue-500 px-2 py-1 text-sm font-semibold text-white transition-colors hover:bg-blue-500/70"
                >
                    Edit
                </button>
                <button
                    onClick={async () => {
                        const response = await onDelete(
                            'title' in row.original
                                ? row.original.id.toString()
                                : row.original.name,
                            session?.accessToken || ''
                        );

                        if (response.status === 'success') {
                            toast.success('Item has been deleted!');
                            refetch();
                        }
                    }}
                    className="rounded-sm bg-red-500 px-2 py-1 text-sm font-semibold text-white transition-colors hover:bg-red-500/70"
                >
                    Delete
                </button>
            </div>
        )
    });

    return (
        <MantineProvider forceColorScheme="dark">
            <MantineReactTable table={table} />
        </MantineProvider>
    );
}
