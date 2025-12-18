'use client';
import { useEffect } from 'react';
import Button from '@/components/common/Button';

export default function Error({
    error
}: {
    error: Error & { digest?: string };
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <h1 className="text-center text-4xl">Internal Server Error</h1>
            <div className="bg-gray-dark mt-12 flex flex-col items-center gap-4 rounded-lg p-8">
                <p className="text-xl">Something went wrong</p>
                <Button onClick={() => window.location.reload()}>
                    Try again
                </Button>
            </div>
        </div>
    );
}
