import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
    return (
        <Link
            href="/"
            className="scaleOnHover flex cursor-pointer items-center gap-2"
        >
            <Image
                src="/logo.png"
                width={45}
                height={45}
                alt="Game Store logo"
            />
            <span className="hidden text-3xl font-medium sm:block">
                Game Store
            </span>
        </Link>
    );
}
