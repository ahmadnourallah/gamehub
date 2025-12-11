import { ReactNode } from 'react';

export default function DashBox({
    children,
    className
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`rounded-md border-2 border-[rgb(38,38,38)] bg-[rgb(32,32,32)] p-4 ${className}`}
        >
            {children}
        </div>
    );
}
