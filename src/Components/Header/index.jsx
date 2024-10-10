import { IoIosArrowUp } from 'react-icons/io';
import { motion } from 'framer-motion';
import { NAME_WEB } from '~/Constants';
import Popover from '../Popover';
import { useState } from 'react';

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="flex justify-between items-center">
            <h1>{NAME_WEB}</h1>
            <div className="flex items-center gap-3">
                <div>
                    <p className="font-medium">Thomas Andree</p>
                    <span className="text-sm">Ux Designer</span>
                </div>
                <div className="flex items-center gap-2">
                    <img
                        className="rounded-full size-10"
                        src="https://picsum.photos/100/100"
                        alt="avt"
                    />
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
    return (
        <div className="bg-white rounded-md shadow-lg overflow-hidden mt-4">
            <ul>
                <li>
                    <button className="w-full py-2 px-4 text-left hover:bg-gray-100 duration-200">
                        Profile
                    </button>
                </li>
                <li>
                    <button className="w-full py-2 px-4 text-left hover:bg-gray-100 duration-200">
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
}
