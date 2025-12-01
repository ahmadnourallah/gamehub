'use client';
import { mdiArrowLeft } from '@mdi/js';
import { useRouter } from 'next/navigation';
import Icon from '@mdi/react';

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-2xl font-bold text-[rgb(204,204,204)] transition-colors duration-200 hover:text-[rgb(24,176,171)]"
        >
            <Icon path={mdiArrowLeft} size={1.3} /> Back
        </button>
    );
}
