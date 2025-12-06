'use client';
import { usePathname } from 'next/navigation';

export default function AuthTitle() {
    const path = usePathname();

    return path === '/login' ? 'Log in' : 'Sign up';
}
