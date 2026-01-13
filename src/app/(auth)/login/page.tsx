import type { Metadata } from 'next';
import LoginForm from '@/components/common/LoginForm';

export const metadata: Metadata = {
    title: 'GameHub - Log in',
    description: 'Log in into your account and start shopping!'
};

export default async function LoginPage() {
    return <LoginForm />;
}
