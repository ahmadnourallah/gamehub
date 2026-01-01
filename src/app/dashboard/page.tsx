import {
    mdiBank,
    mdiCart,
    mdiConsole,
    mdiCurrencyUsd,
    mdiGamepad,
    mdiGamepadRoundUp,
    mdiGamepadVariant,
    mdiHuman
} from '@mdi/js';
import { getGames } from '@/actions/game';
import { getCarts } from '@/actions/cart';
import { getGenres } from '@/actions/genre';
import { getPlatforms } from '@/actions/platform';
import { auth } from '@/auth';
import Icon from '@mdi/react';
import DashBox from '@/components/dashboard/DashBox';

export default async function DashboardHome() {
    const session = await auth();

    const gameResponse = await getGames();
    const cartResponse = await getCarts(
        undefined,
        undefined,
        session?.accessToken as string
    );
    const genreResponse = await getGenres();
    const platformResponse = await getPlatforms();

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
            <DashBox>
                <div className="flex gap-2">
                    <Icon size={1} path={mdiGamepad} />
                    <span>Game count:</span>
                </div>
                <div className="my-2 text-center text-2xl font-bold">
                    {gameResponse.status === 'success'
                        ? gameResponse.data.total
                        : 0}{' '}
                    Games
                </div>
                <div className="flex w-full justify-end text-sm">
                    <Icon size={0.8} path={mdiCurrencyUsd} />
                    <span>All ready for sale</span>
                </div>
            </DashBox>

            <DashBox>
                <div className="flex gap-2">
                    <Icon size={1} path={mdiCart} />
                    <span>Cart count:</span>
                </div>
                <div className="my-2 text-center text-2xl font-bold">
                    {cartResponse.status === 'success'
                        ? cartResponse.data.total
                        : 0}{' '}
                    Carts
                </div>
                <div className="flex w-full justify-end gap-1 text-sm">
                    <Icon size={0.8} path={mdiBank} />
                    <span>All ready for processing</span>
                </div>
            </DashBox>

            <DashBox>
                <div className="flex gap-2">
                    <Icon size={1} path={mdiGamepadVariant} />
                    <span>Genre count:</span>
                </div>
                <div className="my-2 text-center text-2xl font-bold">
                    {genreResponse.status === 'success'
                        ? genreResponse.data.total
                        : 0}{' '}
                    Genres
                </div>
                <div className="gap-sm flex w-full justify-end text-sm">
                    <Icon size={0.8} path={mdiHuman} />
                    <span>For all your users</span>
                </div>
            </DashBox>

            <DashBox>
                <div className="flex gap-2">
                    <Icon size={1} path={mdiConsole} />
                    <span>Platform count:</span>
                </div>
                <div className="my-2 text-center text-2xl font-bold">
                    {platformResponse.status === 'success'
                        ? platformResponse.data.total
                        : 0}{' '}
                    Platforms
                </div>
                <div className="gap-sm flex w-full justify-end text-sm">
                    <Icon size={0.8} path={mdiGamepadRoundUp} />
                    <span>For every type of game</span>
                </div>
            </DashBox>
        </div>
    );
}
