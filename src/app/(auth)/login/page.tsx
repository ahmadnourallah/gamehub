import LoginForm from '@/components/LoginForm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
    const session = await auth();

    if (session) redirect('/');

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <h1 className="mb-8 text-center text-4xl">Log in</h1>

            <LoginForm />
        </div>
    );
}
