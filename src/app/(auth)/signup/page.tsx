import type { Metadata } from 'next';
import SignUpForm from '@/components/common/SignUpForm';

export const metadata: Metadata = {
    title: 'GameHub - Sign up',
    description: 'Create an account and start shopping!'
};

export default async function SignUpPage() {
    return <SignUpForm />;
}
