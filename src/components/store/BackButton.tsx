'use client';
import { mdiArrowLeft } from '@mdi/js';
import { useRouter } from 'next/navigation';
import Icon from '@mdi/react';

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="text-text-primary flex items-center gap-2 text-2xl font-bold transition-all duration-200 hover:brightness-80"
        >
            <Icon path={mdiArrowLeft} size={1.3} /> Back
        </button>
    );
}
