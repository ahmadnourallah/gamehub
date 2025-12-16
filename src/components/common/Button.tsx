import { MouseEventHandler, ReactNode } from 'react';

export default function Button({
    children,
    className,
    onClick,
    disabled = false
}: {
    children: ReactNode;
    className?: string;
    onClick?: MouseEventHandler;
    disabled?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={`rounded-xl bg-white px-4 py-2 text-center text-lg text-black [transition:background_200ms,scale,200ms]! ${disabled ? 'bg-[rgb(106,190,187)]!' : 'scaleOnHover hover:bg-[rgb(106,190,187)]'} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
