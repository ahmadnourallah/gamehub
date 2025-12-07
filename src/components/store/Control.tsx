import { mdiLogin, mdiAccountPlus, mdiMonitorDashboard } from '@mdi/js';
import { auth } from '@/auth';
import Cart from '@/components/store/Cart';
import SignOutButton from '@/components/common/SignOutButton';
import IconButton from '@/components/common/IconButton';
import VerticalDivider from '@/components/common/VerticalDivider';

export default async function Control() {
    const session = await auth();

    return (
        <div className="flex items-center">
            {!session && (
                <>
                    <IconButton
                        tooltip="Login"
                        link="/login"
                        iconPath={mdiLogin}
                    />
                    <VerticalDivider />
                    <IconButton
                        tooltip="Sign Up"
                        link="/signup"
                        iconPath={mdiAccountPlus}
                    />
                </>
            )}

            {session && (
                <>
                    <SignOutButton />
                    <VerticalDivider />
                    {session.user.role === 'ADMIN' && (
                        <>
                            <IconButton
                                tooltip="Dashboard"
                                link="/dashboard"
                                iconPath={mdiMonitorDashboard}
                            />
                            <VerticalDivider />
                        </>
                    )}
                    <Cart />
                </>
            )}
        </div>
    );
}
