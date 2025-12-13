import { CredentialsSignin } from 'next-auth';

export class ConnectionError extends CredentialsSignin {}
export class WrongCredentialsError extends CredentialsSignin {}
