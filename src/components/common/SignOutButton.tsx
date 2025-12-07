'use client';
import { signOut } from 'next-auth/react';
import { mdiLogout } from '@mdi/js';
import IconButton from './IconButton';

export default function SignOutButton() {
    return (
        <form
            className="flex items-center"
            onSubmit={async () => await signOut({ redirectTo: '/' })}
        >
            <IconButton tooltip="Logout" link="/logout" iconPath={mdiLogout} />
        </form>
    );
}
