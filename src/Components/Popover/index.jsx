import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { useClickOutside } from '~/Hooks';

/**
 * Popover component
 * @param {Object} props
 * @param {JSX.Element} props.trigger
 * @param {JSX.Element} props.content
 * @param {String} props.dir - top, bottom, left, right
 * @param {String} props.align - left, center, right
 * @returns {JSX.Element}
 * @example
 * <Popover
 *    trigger={<button>Click me</button>}
 *    content={<div>Popover content</div>}
 *    dir="top"
 * />
 */
function Popover({ trigger, content, dir, onStateChange, align }) {
    const [showPopover, setShowPopover] = useState(false);
    const ref = useRef(null);
    useClickOutside(ref, () => {
        setShowPopover(false);
        onStateChange && onStateChange(false);
    });

    const handleToggle = () => {
        setShowPopover(!showPopover);
        onStateChange && onStateChange(!showPopover);
    };

    return (
        <div className="relative" ref={ref}>
            <div onClick={handleToggle}>{trigger}</div>
            <AnimatePresence>
                {showPopover && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className={clsx({
                            'absolute z-10': true,
                            'bottom-full': dir === 'top',
                            'top-full': dir === 'bottom',
                            'right-full': dir === 'left',
                            'left-full': dir === 'right',
                            'left-1/2 -translate-x-1/2': align === 'center',
                            'right-0':
                                align === 'right' &&
                                dir !== 'left' &&
                                dir !== 'right',
                            'left-0':
                                align === 'left' &&
                                dir !== 'left' &&
                                dir !== 'right',
                        })}
                    >
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Popover;
