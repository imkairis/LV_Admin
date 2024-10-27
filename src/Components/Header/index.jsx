import { IoIosArrowUp } from 'react-icons/io';
import { motion } from 'framer-motion';
import { NAME_WEB } from '~/Constants';
import Popover from '../Popover';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/store/authSlice';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);

    const url = useMemo(() => {
        if (user?.avatar) {
            return `${import.meta.env.VITE_API_URL}/${user.avatar}`;
        }
        return 'https://picsum.photos/100/100';
    }, [user.avatar]);

    return (
        <header className="flex justify-between items-center">
            <h2>{NAME_WEB}</h2>
            <div className="flex items-center gap-3">
                <div>
                    <p className="font-medium">{user?.fullname}</p>
                    <span className="text-sm">
                        {user?.isAdmin ? 'Admin' : 'Staff'}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <img className="rounded-full size-10" src={url} alt="avt" />

                    <Popover
                        trigger={
                            <motion.div
                                className="cursor-pointer"
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <IoIosArrowUp size={20} />
                            </motion.div>
                        }
                        content={<ContentPopover />}
                        dir="bottom"
                        onStateChange={setIsOpen}
                        align="center"
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;

function ContentPopover() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };

    const navigateToProfile = () => {
        navigate('/profile');
    };
    return (
        <div className="bg-white rounded-md shadow-lg overflow-hidden mt-4">
            <ul>
                <li>
                    <button
                        className="w-full py-2 px-4 text-left hover:bg-gray-100 duration-200"
                        onClick={navigateToProfile}
                    >
                        Profile
                    </button>
                </li>
                <li>
                    <button
                        className="w-full py-2 px-4 text-left hover:bg-gray-100 duration-200"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
}
