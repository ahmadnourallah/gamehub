'use client';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { validateEmail, validatePassword } from '@/lib/validation';
import Button from './Button';
import loginAction from '@/actions/loginAction';
import Link from 'next/link';
import AuthInput from './AuthInput';

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    return (
        <form
            className="flex flex-col gap-2 rounded-lg bg-[#202020] p-8 shadow-sm shadow-[rgba(0,255,255,0.7)]"
            action={async (formData: FormData) => {
                const res = await loginAction(formData);

                if (res?.error) toast.error(res.error);
                else {
                    router.push('/');
                    toast.success('Successfully logged in!');
                }
            }}
        >
            <AuthInput
                label="Email"
                name="email"
                id="email"
                value={email}
                type="email"
                isValid={isEmailValid}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if (validateEmail(e.target.value)) setIsEmailValid(true);
                    else setIsEmailValid(false);
                }}
                validationMessage="* Email is not valid"
            />

            <AuthInput
                label="Password"
                name="password"
                id="password"
                value={password}
                type="password"
                isValid={isPasswordValid}
                onChange={(e) => {
                    setPassword(e.target.value);
                    if (validatePassword(e.target.value))
                        setIsPasswordValid(true);
                    else setIsPasswordValid(false);
                }}
                validationMessage="* Minimum eight characters, at least one letter, one number
                    and one special character"
            />

            <p>
                Don&apos;t have an account?{' '}
                <Link className="text-[rgb(24,176,171)]" href="/signup">
                    Sign up
                </Link>
            </p>
            <Button
                disabled={
                    !email.length ||
                    !password.length ||
                    !isEmailValid ||
                    !isPasswordValid
                }
            >
                Login
            </Button>
        </form>
    );
}
