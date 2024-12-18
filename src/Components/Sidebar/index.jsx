import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiX } from 'react-icons/hi';
import { IoIosArrowUp } from 'react-icons/io';
import { MdOutlineDashboard } from 'react-icons/md';
import { PiDog } from 'react-icons/pi';
import { RiBillLine } from 'react-icons/ri';
import { BsCardList } from 'react-icons/bs';
import { LuUserSquare } from 'react-icons/lu';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '~/Constants';
import { PiBoneBold } from 'react-icons/pi';
function Sidebar({ open, onClose }) {
    const navItems = [
        { to: '/', label: 'Thống kê', icon: <MdOutlineDashboard size={18} /> },
        {
            label: 'Danh mục',
            icon: <BsCardList size={18} />,
            children: [
                { to: ROUTES.PRODUCT_TYPE, label: 'Loại sản phẩm' },
                { to: ROUTES.AGE_GROUP, label: 'Nhóm tuổi' },
                { to: ROUTES.TARGET_AUDIENCE, label: 'Loại thú cưng' },
                { to: ROUTES.Brand, label: 'Nhà cung cấp' },
                { to: ROUTES.Type, label: 'Loại thú cưng' },
            ],
        },
        {
            to: ROUTES.PRODUCTS,
            label: 'Sản phẩm',
            icon: <PiBoneBold size={18} />,
        },
        { to: ROUTES.ADOPT, label: 'Nhận nuôi', icon: <PiDog size={18} /> },
        { to: ROUTES.ORDER, label: 'Đơn hàng', icon: <RiBillLine size={18} /> },

        {
            to: ROUTES.USERS,
            label: 'Tài khoản',
            icon: <LuUserSquare size={18} />,
        },
    ];
    return (
        <div
            className={`sm:none duration-175 linear fixed top-0 left-0 z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 h-dvh overflow-auto ${
                open ? 'translate-x-0' : '-translate-x-96'
            }`}
        >
            <button className="absolute top-4 right-4 xl:hidden">
                <HiX className="w-8 h-8" onClick={onClose} />
            </button>

            <div className={`mx-[56px] mt-[50px] flex items-center`}>
                <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
                    <span className="font-medium">Pet</span> Shop
                </div>
            </div>
            <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />

            <ul>
                {navItems.map((item, index) => (
                    <NavItem key={index} {...item} />
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;

const NavItem = ({ to, icon, label, children, second }) => {
    return (
        <>
            {children ? (
                <NavItemHaveChildren
                    icon={icon}
                    label={label}
                    child={children}
                />
            ) : (
                <li>
                    <Link to={to}>
                        <InnerNavItem
                            icon={icon}
                            label={label}
                            second={second}
                            to={to}
                        />
                    </Link>
                </li>
            )}
        </>
    );
};

const InnerNavItem = ({ icon, label, second, to }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <div
            className={clsx(
                'relative flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-navy-700 cursor-pointer',
                second ? 'pl-11 py-2' : 'pl-8 py-4',
                isActive ? 'bg-blue-100 dark:bg-navy-900' : ''
            )}
        >
            {icon}
            <span>{label}</span>
            {isActive && <ActiveIndicator />}
        </div>
    );
};

const NavItemHaveChildren = ({ icon, label, child }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <li>
            <div
                className="flex items-center gap-2 pl-8 py-4 cursor-pointer justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex gap-1 items-center">
                    {icon}
                    <span>{label}</span>
                </div>
                <motion.div
                    className="px-1"
                    animate={{ rotate: isOpen ? 0 : 180 }}
                    transition={{ duration: 0.2 }}
                >
                    <IoIosArrowUp size={20} />
                </motion.div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul>
                            {child.map((item, index) => (
                                <NavItem key={index} second {...item} />
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    );
};

const ActiveIndicator = () => {
    return <div className="bg-blue-400 absolute w-1 h-full right-0" />;
};
