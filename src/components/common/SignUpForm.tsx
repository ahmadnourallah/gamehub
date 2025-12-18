'use client';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { validateEmail, validatePassword } from '@/lib/validation';
import { createUser } from '@/actions/user';
import { convertErrToStr } from '@/lib/utils';
import Button from '@/components/common/Button';
import Link from 'next/link';
import AuthInput from '@/components/common/AuthInput';

export default function SignUpForm() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();
        const response = await createUser(name, email, password);

        if (response.status === 'success') {
            toast.success('User created successfully!');
            router.push('/login');
        } else toast.error(convertErrToStr(response.data));
    };

    return (
        <form
            className="bg-gray-dark flex flex-col gap-2 rounded-lg p-8 shadow-sm shadow-[rgba(0,255,255,0.7)]"
            onSubmit={handleSignUp}
        >
            <AuthInput
                label="Name"
                name="name"
                id="name"
                value={name}
                type="text"
                isValid={isNameValid}
                onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value.length) setIsNameValid(true);
                    else setIsNameValid(false);
                }}
                validationMessage="* Name cannot be empty"
            />

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
                Already have an account?{' '}
                <Link className="text-text-primary" href="/login">
                    Log in
                </Link>
            </p>
            <Button
                disabled={
                    !name.length ||
                    !email.length ||
                    !password.length ||
                    !isEmailValid ||
                    !isPasswordValid ||
                    !isNameValid
                }
            >
                Sign Up
            </Button>
        </form>
    );
}
