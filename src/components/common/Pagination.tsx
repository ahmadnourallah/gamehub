'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Pagination({
    pageSize = 10,
    total
}: {
    pageSize?: number;
    total: number;
}) {
    const searchParams = useSearchParams();

    const buttons = [];

    for (let i = 0; i < total / pageSize; i++)
        buttons.push(
            <Link href={`?page=${i + 1}`} key={i + 1}>
                <button
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-[rgb(32,32,32)] p-4 transition-colors duration-200 hover:bg-white hover:text-black ${parseInt(searchParams.get('page') || '') === i + 1 || (!searchParams.get('page') && i + 1 === 1) ? 'bg-white text-black' : ''}`}
                >
                    {i + 1}
                </button>
            </Link>
        );

    return (
        <div className="my-8 flex w-full justify-center gap-2 text-xl">
            {buttons}
        </div>
    );
}
