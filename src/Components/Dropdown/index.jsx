import { useRef, useState } from 'react';
import { useClickOutside } from '~/Hooks';

const Dropdown = (props) => {
    const { button, children, classNames, animation } = props;
    const wrapperRef = useRef(null);
    const [openWrapper, setOpenWrapper] = useState(false);

    useClickOutside(wrapperRef, () => {
        setOpenWrapper(false);
    });

    return (
        <div ref={wrapperRef} className="relative flex">
            <div
                className="flex"
                onMouseDown={() => setOpenWrapper(!openWrapper)}
            >
                {button}
            </div>
            <div
                className={`${classNames} absolute z-10 ${
                    animation
                        ? animation
                        : 'origin-top-right transition-all duration-300 ease-in-out'
                } ${openWrapper ? 'scale-100' : 'scale-0'}`}
            >
                {children}
            </div>
        </div>
    );
};

export default Dropdown;
