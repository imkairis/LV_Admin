import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { useClickOutside } from '~/Hooks';

function Modal({
    open = false,
    onClose = () => {},
    title = 'Modal title',
    footer = '',
    children,
}) {
    const ref = useRef(null);
    useClickOutside(ref, onClose);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                >
                    <motion.div
                        ref={ref}
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        exit={{ y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={clsx({
                            'rounded-lg w-1/3 p-4 bg-white': true,
                        })}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">{title}</h3>
                            <button onClick={onClose}>
                                <IoClose size={22} />
                            </button>
                        </div>
                        <div className="mt-4">{children}</div>
                        {footer && <div className="mt-4">{footer}</div>}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Modal;
