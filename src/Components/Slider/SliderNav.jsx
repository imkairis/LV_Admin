import { clsx } from 'clsx';
import { IoChevronForward, IoChevronBack } from 'react-icons/io5';
const SliderNav = ({ onPrev, onNext, canGoPrev, canGoNext }) => {
    return (
        <>
            <button
                type="button"
                onClick={onPrev}
                className={clsx(
                    'transition-all duration-500 p-2 rounded-full absolute top-1/2 left-[3%] transform -translate-y-1/2 group-hover:bg-gray-200 group-hover:visible invisible',
                    canGoPrev ? 'opacity-100' : 'opacity-20 cursor-not-allowed'
                )}
            >
                <IoChevronBack />
            </button>

            <button
                type="button"
                onClick={onNext}
                className={clsx(
                    'transition-all duration-500 p-2 rounded-full absolute top-1/2 right-[3%] transform -translate-y-1/2 group-hover:bg-gray-200 group-hover:visible invisible',
                    canGoNext ? 'opacity-100' : 'opacity-20 cursor-not-allowed'
                )}
            >
                <IoChevronForward />
            </button>
        </>
    );
};

export default SliderNav;
