'use client';
import { signOut } from 'next-auth/react';
import { mdiLogout } from '@mdi/js';
import Icon from '@mdi/react';

export default function SignOutButton() {
    return (
        <form onSubmit={async () => await signOut()}>
            <button
                data-tooltip="Logout"
                className="tooltip relative mr-2 border-r-2 border-r-white pr-2"
            >
                <Icon
                    className="scaleOnHover h-5 w-5 sm:h-6 sm:w-6"
                    path={mdiLogout}
                />
            </button>
        </form>
    );
}
