import type { UpdateResponseType, UserType } from '@/lib/types';

export async function createUser(
    name: string,
    email: string,
    password: string
): Promise<UpdateResponseType<'user', UserType>> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    });

    return response.json();
}
