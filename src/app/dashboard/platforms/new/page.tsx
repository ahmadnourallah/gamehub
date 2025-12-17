'use client';
import { createPlatform } from '@/actions/platform';
import { PlatformType } from '@/lib/types';
import DashEditor from '@/components/dashboard/DashEditor';

export default function NewPlatform() {
    return (
        <DashEditor<'platform', PlatformType>
            mode="ADD"
            redirectTo="/dashboard/platforms"
            addingGame={false}
            onSubmit={createPlatform}
        />
    );
}
