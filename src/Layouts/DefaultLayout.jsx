import { Outlet } from 'react-router-dom';
import Aside from '../Components/Aside';
import { NAME_WEB } from '~/Constants';
import Header from '~/Components/Header';

function DefaultLayout() {
    return (
        <div className="flex">
            <div className="h-dvh overflow-hidden flex-shrink-0 shadow-lg">
                <Aside />
            </div>
            <div className="w-full px-10 py-5">
                <Header />
            </div>
        </div>
    );
}

export default DefaultLayout;
