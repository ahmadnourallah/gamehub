export function paginate(
    pageParam: string | string[] | undefined,
    pageSize: number
): [start: number, end: number, currentPage: number] {
    let page;

    if (Array.isArray(pageParam)) pageParam = pageParam[0];

    if (typeof pageParam === 'string' && parseInt(pageParam))
        page = Math.abs(parseInt(pageParam));
    else page = 1;

    const start = page > 1 ? (page - 1) * pageSize + 1 : (page - 1) * pageSize;
    const end = (page - 1) * pageSize + pageSize;

    return [start, end, page];
}
