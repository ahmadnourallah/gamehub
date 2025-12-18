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
            className={`border-gray-neutral bg-gray-dark rounded-md border-2 p-4 ${className}`}
        >
            {children}
        </div>
    );
}
