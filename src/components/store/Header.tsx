import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/common/SearchBar';
import Control from '@/components/store/Control';

export default async function Header() {
    return (
        <header className="relative z-100 container mx-auto flex items-center justify-between gap-4 p-4">
            <Link
                href="/"
                className="scaleOnHover flex cursor-pointer items-center gap-2"
            >
                <Image src="/logo.png" width={45} height={45} alt="" />
                <span className="hidden text-3xl font-medium sm:block">
                    Game Store
                </span>
            </Link>

            <SearchBar />

            <Control />
        </header>
    );
}
