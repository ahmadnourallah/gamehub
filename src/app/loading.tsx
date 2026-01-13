import Spinner from '@/components/common/Spinner';

export default function Loading() {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner size="80px" spinnerColor="#FFF" bg="#0f1011" />
        </div>
    );
}
