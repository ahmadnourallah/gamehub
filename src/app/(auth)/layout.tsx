import { ReactNode } from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { mdiArrowLeft } from '@mdi/js';
import Link from 'next/link';
import Icon from '@mdi/react';
import AuthTitle from '@/components/common/AuthTitle';

export default async function AuthLayout({
    children
}: {
    children: ReactNode;
}) {
    const session = await auth();

    if (session) redirect('/');

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <div>
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-center text-4xl">
                        <AuthTitle />
                    </h1>

                    <Link href="/">
                        <button className="flex gap-2 text-2xl font-bold text-[rgb(204,204,204)] transition-colors duration-200 hover:text-[rgb(24,176,171)]">
                            <Icon path={mdiArrowLeft} size={1.3} /> Home
                        </button>
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
