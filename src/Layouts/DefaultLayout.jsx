import { Outlet } from 'react-router-dom';
import Aside from '../Components/Aside';
import Header from '~/Components/Header';

function DefaultLayout() {
    const width = '16rem';

    return (
        <div className="flex">
            <div
                className="h-dvh overflow-hidden flex-shrink-0 shadow-lg"
                style={{ width: width }}
            >
                <Aside width={width} />
            </div>
            <div className="w-full px-10 py-5">
                <Header />
                <Outlet />
            </div>
        </div>
    );
}

export default DefaultLayout;
