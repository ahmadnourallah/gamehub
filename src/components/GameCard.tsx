import { mdiConsole } from '@mdi/js';
import { Platforms } from './Navbar';
import { PlatformType } from '@/queries/platform';
import Link from 'next/link';
import shimmer from '@/utils/shimmer';
import Image from 'next/image';
import Icon from '@mdi/react';

export default function GameCard({
    id,
    thumbnail,
    title,
    price,
    isAdded,
    platforms,
    className
}: {
    id: number;
    thumbnail: string;
    title: string;
    price: number;
    isAdded: boolean;
    platforms: PlatformType[];
    className?: string;
}) {
    return (
        <div
            className={`flex h-[370px] flex-col gap-2 rounded-2xl bg-[#202020] ${className}`}
        >
            <Link href={`store/games/${id}`}>
                <Image
                    className="h-50 w-full rounded-t-2xl"
                    placeholder={`data:image/svg+xml;base64,${shimmer()}`}
                    src={
                        thumbnail
                            ? `http://localhost:3000/${thumbnail}`
                            : '/default.jpg'
                    }
                    alt=""
                    width={0}
                    height={0}
                    sizes="100%"
                />
            </Link>

            <div className="flex flex-col gap-3 p-4">
                <div className="flex justify-between text-[rgb(24,176,171)]">
                    <button>{isAdded ? `Added ✓` : 'Add to cart +'}</button>
                    <div>${price}</div>
                </div>

                <div className="flex">
                    {platforms.map((platform, index) => (
                        <Icon
                            size={0.8}
                            key={index}
                            path={
                                Platforms[
                                    platform.name as keyof typeof Platforms
                                ] || mdiConsole
                            }
                        />
                    ))}
                </div>

                <Link href={`store/games/${id}`}>
                    <h3 className="text-2xl font-bold overflow-ellipsis">
                        {title}
                    </h3>
                </Link>
            </div>
        </div>
    );
}
