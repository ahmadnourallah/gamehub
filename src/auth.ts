import NextAuth, { DefaultSession, Session, User } from 'next-auth';
import { ConnectionError, WrongCredentialsError } from '@/utils/errors';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        email: string;
        role: string;
        accessToken: string;
    }
}

declare module 'next-auth' {
    interface User {
        id: string;
        email: string;
        role: string;
        token: string;
    }

    interface Session {
        user: User & DefaultSession['user'];
        expires: string;
        accessToken: string;
    }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                let res;
                try {
                    res = await fetch(
                        `${process.env.NEXT_PUBLIC_API}/users/authenticate`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password
                            })
                        }
                    );
                } catch {
                    throw new ConnectionError();
                }

                const data = await res.json();

                if (!res.ok) throw new WrongCredentialsError();

                return data.data.user;
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }: { token: JWT; user: User }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            session.user.id = token.id;
            session.user.role = token.role;
            session.accessToken = token.accessToken;

            return session;
        }
    }
});
