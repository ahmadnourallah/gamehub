'use client';
import { signOutAction } from '@/actions/auth';
import { mdiLogout } from '@mdi/js';
import IconButton from './IconButton';
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
    return (
        <form className="flex items-center" action={signOutAction}>
            <IconButton
                tooltip="Logout"
                onClick={async () => await signOut({ redirectTo: '/' })}
                iconPath={mdiLogout}
            />
        </form>
    );
}
