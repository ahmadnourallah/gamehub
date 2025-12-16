import type { QueryAllResponseType, PublisherType } from '@/lib/types';
import { fetchAPI } from '@/lib/utils';

export async function getPublishers(): Promise<
    QueryAllResponseType<'publishers', PublisherType[]>
> {
    return await fetchAPI('/publishers');
}
