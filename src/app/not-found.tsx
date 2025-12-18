import Button from '@/components/common/Button';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Page not found',
    description: "The page you're looking for is not found."
};

export default function NotFound() {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <h1 className="text-center text-4xl">Not Found</h1>
            <div className="bg-gray-dark mt-12 flex flex-col items-center gap-4 rounded-lg p-8">
                <p className="text-xl">Could not find requested resource</p>
                <Link href="/" className="mt-8">
                    <Button>Return Home</Button>
                </Link>
            </div>
        </div>
    );
}
