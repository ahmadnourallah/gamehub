import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
    return (
        <div className="flex flex-col justify-center items-center mt-12">
            <h1 className="mb-8 text-center text-4xl">Log in</h1>

            <LoginForm />
        </div>
    );
}
