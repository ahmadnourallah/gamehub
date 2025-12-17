import { ReactNode } from 'react';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { mdiStore } from '@mdi/js';
import { redirect } from 'next/navigation';
import SignOutButton from '@/components/common/SignOutButton';
import DashNavbar from '@/components/dashboard/DashNavbar';
import VerticalDivider from '@/components/common/VerticalDivider';
import IconButton from '@/components/common/IconButton';

export default async function DashboardLayout({
    children
}: {
    children: ReactNode;
}) {
    const session = await auth();

    if (!session || !(session.user.role === 'ADMIN')) redirect('/');

    return (
        <SessionProvider>
            <div className="mx-auto flex max-w-450 gap-5">
                <DashNavbar />
                <main className="h-screen w-full overflow-auto p-6">
                    <header className="mb-10 flex w-full justify-between">
                        <div className="text-xl">
                            Welcome, {session?.user.name}
                        </div>
                        <div className="flex">
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
                </main>
            </div>
        </SessionProvider>
    );
}
