import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from '~/Components/Sidebar';
import Navbar from '~/Components/Navbar';

function DefaultLayout(props) {
    const [open, setOpen] = useState(true);
    const { ...rest } = props;
    // const location = useLocation();
    // const [currentRoute, setCurrentRoute] = useState('Main Dashboard');

    useEffect(() => {
        window.addEventListener('resize', () =>
            window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
        );
    }, []);
    // useEffect(() => {
    //     getActiveRoute(routes);
    // }, [location.pathname]);

    // const getActiveNavbar = (routes) => {
    //     let activeNavbar = false;
    //     for (let i = 0; i < routes.length; i++) {
    //         if (
    //             window.location.href.indexOf(
    //                 routes[i].layout + routes[i].path
    //             ) !== -1
    //         ) {
    //             return routes[i].secondary;
    //         }
    //     }
    //     return activeNavbar;
    // };

    return (
        <div className="flex h-full w-full">
            <Sidebar open={open} onClose={() => setOpen(false)} />

            <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
                <main
                    className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
                >
                    {/* <Header /> */}
                    <Navbar
                        onOpenSideNav={() => setOpen(true)}
                        // brandText={currentRoute}
                        // secondary={getActiveNavbar(routes)}
                        {...rest}
                    />
                    <div className="pt-5s mx-auto mb-auto min-h-dvh p-2 md:pr-2">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DefaultLayout;
