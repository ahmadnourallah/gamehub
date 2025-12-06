import { mdiLogin, mdiAccountPlus } from '@mdi/js';
import { auth } from '@/auth';
import Link from 'next/link';
import Icon from '@mdi/react';
import Cart from '@/components/Cart';
import SignOutButton from './SignOutButton';

export default async function Control() {
    const session = await auth();

    return (
        <div className="flex items-center">
            {!session && (
                <>
                    <Link
                        href="/login"
                        data-tooltip="Login"
                        className="tooltip relative mr-2 border-r-2 border-r-white pr-2"
                    >
                        <Icon
                            className="scaleOnHover h-5 w-5 sm:h-6 sm:w-6"
                            path={mdiLogin}
                        />
                    </Link>
                    <Link
                        href="/signup"
                        data-tooltip="Sign up"
                        className="tooltip relative pr-2"
                    >
                        <Icon
                            className="scaleOnHover h-5 w-5 sm:h-6 sm:w-6"
                            path={mdiAccountPlus}
                        />
                    </Link>
                </>
            )}

            {session && (
                <>
                    <SignOutButton />
                    <Cart />
                </>
            )}
        </div>
    );
}
