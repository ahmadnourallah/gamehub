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
                    <h1 className="text-center">
                        <AuthTitle />
                    </h1>

                    <Link href="/">
                        <button className="text-text-primary flex gap-2 text-2xl font-bold transition-all duration-200 hover:brightness-80">
                            <Icon path={mdiArrowLeft} size={1.3} /> Home
                        </button>
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
