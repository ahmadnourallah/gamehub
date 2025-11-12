import Button from '@/components/Button';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="mt-12">
            <h1 className="text-center text-4xl">Not Found</h1>
            <div className="mt-12 flex flex-col items-center rounded-lg bg-[#202020] p-8">
                <p className="text-xl">Could not find requested resource</p>
                <Link href="/" className="mt-8">
                    <Button>Return Home</Button>
                </Link>
            </div>
        </div>
    );
}
