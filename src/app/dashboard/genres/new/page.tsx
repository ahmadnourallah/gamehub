'use client';
import { createGenre } from '@/actions/genre';
import { GenreType } from '@/lib/types';
import DashEditor from '@/components/dashboard/DashEditor';

export default function NewGenre() {
    return (
        <DashEditor<'genre', GenreType>
            mode="ADD"
            redirectTo="/dashboard/genres"
            addingGame={false}
            onSubmit={createGenre}
        />
    );
}
