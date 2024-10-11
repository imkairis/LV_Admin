import { useState } from 'react';
import { MdOutlineDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { IoIosArrowUp } from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

function Aside({ width }) {
    const navItems = [
        { to: '/', label: 'Dashboard', icon: <MdOutlineDashboard size={18} /> },
        {
            label: 'Category',
            children: [
                {
                    to: '/category/payment-method',
                    label: 'Payment Method',
                },
                {
                    to: '/category/delivery-method',
                    label: 'Delivery Method',
                },
                {
                    to: '/category/product-attribute',
                    label: 'Product Attribute',
                },
                {
                    to: '/category/order-status',
                    label: 'Order Status',
                },
                {
                    to: '/category/product-type',
                    label: 'Promotion Type',
                },
            ],
        },
        { to: '/products', label: 'Product' },
        { to: '/orders', label: 'Order' },
        { to: '/promotions', label: 'Promotion' },
        { to: '/users', label: 'User' },
    ];

    return (
        <motion.aside
            className="fixed h-dvh bg-white"
            layout
            style={{ width: width }}
        >
            <div className="flex items-center gap-2 pt-10 pl-8 mb-4">
                <img
                    src="https://picsum.photos/50/50"
                    alt="logo"
                    className="rounded-full"
                />
                <h1 className="text-xl font-bold">Logo</h1>
            </div>

            <ul>
                {navItems.map((item, index) => (
                    <NavItem key={index} {...item} />
                ))}
            </ul>
        </motion.aside>
    );
}

export default Aside;

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
                'relative flex items-center gap-2',
                second ? 'pl-11 py-2' : 'pl-8 py-4',
                isActive ? 'bg-blue-100' : ''
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
                    animate={{ rotate: isOpen ? 180 : 0 }}
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
