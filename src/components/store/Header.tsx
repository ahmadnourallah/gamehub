import SearchBar from '@/components/common/SearchBar';
import Control from '@/components/store/Control';
import Logo from '@/components/common/Logo';

export default async function Header() {
    return (
        <header className="relative z-100 container mx-auto flex items-center justify-between gap-4 p-4">
            <Logo />

            <SearchBar />

            <Control />
        </header>
    );
}
