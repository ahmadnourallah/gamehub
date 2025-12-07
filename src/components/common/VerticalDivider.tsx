export default function VerticalDivider({
    height = '25px'
}: {
    height?: string;
}) {
    return (
        <div
            style={{ height }}
            className="mx-2 border-r-1 border-l-1 border-r-white border-l-white"
        ></div>
    );
}
