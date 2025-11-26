import Navbar from '@/components/Navbar';
import { ReactNode } from 'react';

export default function StoreLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative container mx-auto flex gap-20 overflow-x-clip p-4">
            <Navbar />
            {children}
        </div>
    );
}
