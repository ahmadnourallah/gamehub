'use server';
import { signIn } from '@/auth';
import { WrongCredentialsError } from '@/utils/errors';

export default async function loginAction(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        await signIn('credentials', {
            email,
            password,
            redirect: false
        });
    } catch (error) {
        if (error instanceof WrongCredentialsError) {
            return { error: 'Credentials are wrong' };
        } else return { error: 'Something went wrong' };
    }

    return {};
}
