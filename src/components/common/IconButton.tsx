'use client';
import { useRouter } from 'next/navigation';
import Icon from '@mdi/react';

export default function IconButton({
    link,
    iconPath,
    tooltip,
    onClick,
    badge
}: {
    link?: string;
    onClick?: VoidFunction;
    iconPath: string;
    tooltip: string;
    badge?: string;
}) {
    const router = useRouter();

    return (
        <button
            onClick={link ? () => router.push(link) : onClick}
            data-tooltip={tooltip}
            className="tooltip scaleOnHover relative"
        >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" path={iconPath} />
            {badge && (
                <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-[100%] bg-[#18B0AB] p-2 text-center text-xs font-bold select-none">
                    {badge}
                </div>
            )}
        </button>
    );
}
