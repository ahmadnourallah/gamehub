import { ReactNode } from 'react';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { mdiStore } from '@mdi/js';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import SignOutButton from '@/components/common/SignOutButton';
import DashNavbar from '@/components/dashboard/DashNavbar';
import VerticalDivider from '@/components/common/VerticalDivider';
import IconButton from '@/components/common/IconButton';

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false
    }
};

export default async function DashboardLayout({
    children
}: {
    children: ReactNode;
}) {
    const session = await auth();

    if (!session || !(session.user.role === 'ADMIN')) redirect('/');

    return (
        <SessionProvider>
            <div className="flex h-screen overflow-hidden">
                <DashNavbar />
                <main className="h-full w-full overflow-hidden">
                    <div className="scrollbar-hidden relative h-full w-full overflow-x-auto p-6">
                        <header className="mb-10 flex w-full items-center justify-between">
                            <div className="text-md sm:text-xl">
                                Welcome, {session?.user.name}
                            </div>
                            <div className="flex items-center">
                                <SignOutButton />
                                <VerticalDivider />
                                <IconButton
                                    link="/store"
                                    tooltip="Store"
                                    iconPath={mdiStore}
                                />
                            </div>
                        </header>
                        {children}
                    </div>
                </main>
            </div>
        </SessionProvider>
    );
}
