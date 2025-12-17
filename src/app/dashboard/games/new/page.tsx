'use client';
import { addGame } from '@/actions/game';
import { GameType } from '@/lib/types';
import DashEditor from '@/components/dashboard/DashEditor';

export default function NewGame() {
    return (
        <DashEditor<'game', GameType>
            mode="ADD"
            redirectTo="/dashboard/games"
            addingGame={true}
            onSubmit={addGame}
        />
    );
}
