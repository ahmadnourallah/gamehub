import { MouseEventHandler, ReactNode } from 'react';

export default function Button({
    children,
    className,
    onClick
}: {
    children: ReactNode;
    className?: string;
    onClick?: MouseEventHandler;
}) {
    return (
        <button
            onClick={onClick}
            className={`scaleOnHover rounded-xl bg-white px-4 py-2 text-center text-lg text-black ![transition:background_200ms,scale,200ms] hover:bg-[rgb(106,190,187)] ${className}`}
        >
            {children}
        </button>
    );
}
