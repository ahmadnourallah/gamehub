import { mdiCartOutline } from '@mdi/js';
import Icon from '@mdi/react';

export default function Cart() {
    return (
        <div className="tooltip relative flex items-center" data-tooltip="Cart">
            <button className="scaleOnHover relative">
                <Icon
                    path={mdiCartOutline}
                    className="h-6 w-6 sm:h-8 sm:w-8"
                    color="#FFFFFF"
                />
                <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-[100%] bg-[#18B0AB] p-2 text-center text-xs font-bold">
                    2
                </div>
            </button>
        </div>
    );
}
