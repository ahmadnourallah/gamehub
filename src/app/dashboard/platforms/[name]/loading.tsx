import Spinner from '@/components/common/Spinner';

export default function Loading() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <Spinner size="80px" spinnerColor="#FFF" bg="#0f1011" />
        </div>
    );
}
