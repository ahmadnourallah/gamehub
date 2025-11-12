'use client';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Button from './Button';
import loginAction from '@/actions/loginAction';
import Link from 'next/link';

export default function LoginForm() {
    const router = useRouter();

    return (
        <form
            className="flex flex-col gap-5 rounded-lg bg-[#202020] p-8 shadow-sm shadow-[rgba(0,255,255,0.7)]"
            action={async (formData: FormData) => {
                const res = await loginAction(formData);

                if (res?.error) toast.error(res.error);
                else router.push('/');
            }}
        >
            <label className="flex flex-col" htmlFor="email">
                Email
                <input
                    id="email"
                    className="w-60 rounded-md bg-white px-3 py-1 text-black sm:w-100"
                    name="email"
                    type="email"
                    required
                />
            </label>

            <label className="flex flex-col" htmlFor="password">
                Password
                <input
                    id="password"
                    className="w-60 rounded-md bg-white px-3 py-1 text-black sm:w-100"
                    name="password"
                    type="password"
                    required
                />
            </label>
            <p>
                Don&apos;t have an account?{' '}
                <Link className="text-[rgb(24,176,171)]" href="/signup">
                    Sign up
                </Link>
            </p>
            <Button>Login</Button>
        </form>
    );
}
