export function paginate(
    page: number,
    pageSize: number
): [start: number, end: number] {
    const start = page > 1 ? (page - 1) * pageSize + 1 : (page - 1) * pageSize;
    const end = (page - 1) * pageSize + pageSize;

    return [start, end];
}
