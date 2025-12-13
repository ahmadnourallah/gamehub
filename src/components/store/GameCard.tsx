'use client';
import { getPlatformIcon, shimmer } from '@/lib/utils';
import type { PlatformType } from '@/lib/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@mdi/react';
import AddToCartButton from '@/components/store/AddToCartButton';

export default function GameCard({
    id,
    thumbnail,
    title,
    price,
    platforms,
    className
}: {
    id: number;
    thumbnail: string;
    title: string;
    price: number;
    platforms: PlatformType[];
    className?: string;
}) {
    const router = useRouter();

    return (
        <div
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ')
                    router.push(`/store/games/${id}`);
            }}
            tabIndex={0}
            className={`flex h-full max-w-150 flex-col gap-2 rounded-2xl bg-[#202020] ${className}`}
        >
            <Link href={`/store/games/${id}`} tabIndex={-1}>
                <Image
                    className="h-auto w-full rounded-t-2xl"
                    placeholder={`data:image/svg+xml;base64,${shimmer()}`}
                    src={
                        thumbnail
                            ? `${process.env.NEXT_PUBLIC_API}/${thumbnail}`
                            : '/default.jpg'
                    }
                    alt=""
                    width={316}
                    height={178}
                    sizes="100vw"
                />
            </Link>

            <div className="flex flex-col gap-3 p-4">
                <div className="flex justify-between text-[rgb(24,176,171)]">
                    <AddToCartButton gameId={id} />
                    <div>${price}</div>
                </div>

                <div className="flex">
                    {platforms.map((platform, index) => (
                        <Icon
                            size={0.8}
                            key={index}
                            path={getPlatformIcon(platform.name)}
                        />
                    ))}
                </div>

                <Link href={`/store/games/${id}`} tabIndex={-1}>
                    <h3
                        title={title}
                        className="line-clamp-2 text-2xl font-bold overflow-ellipsis"
                    >
                        {title}
                    </h3>
                </Link>
            </div>
        </div>
    );
}
