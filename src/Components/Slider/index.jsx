import { motion } from 'framer-motion';
import { useSlider } from '~/Hooks';
import SliderNav from './SliderNav';
import SliderPagination from './SliderPagination';
import { useEffect } from 'react';

/**
 * Slider component
 * @param {Object} config - Configuration for the slider {
 *     slidesToShow: Number,
 *    slidesToScroll: Number,
 *   infinite: Boolean,
 *  dots: Boolean,
 * arrows: Boolean,
 * spacing: Number
 * }
 * @param {Array} responsiveConfig - Responsive configuration for the slider
 * @param {Function} renderItem - Function to render each item in the slider
 * @param {Array} data - Data to be displayed in the slider
 * @returns {JSX.Element}
 * @constructor
 *
 * @example
 * <Slider
 *    config={{
 *       infinite: true,
 *       autoScroll: 5000,
 *    }}
 *    data={data}
 *    renderItem={(src) => (
 *       <ProductImage
 *          src={src}
 *          alt={data?.data?.name}
 *       />
 *   )}
 * />
 */
const Slider = ({ config, responsiveConfig = [], renderItem, data }) => {
    const {
        currentSlide,
        canGoNext,
        canGoPrev,
        scrollTo,
        settings,
        setCurrentSlide,
        nextSlide,
        prevSlide,
        setScrollTo,
        slideWidth,
    } = useSlider(data, config, responsiveConfig);

    useEffect(() => {
        let intervalId;
        if (!config?.autoScroll) return;
        intervalId = setInterval(() => {
            if (canGoNext) {
                nextSlide();
            } else {
                setCurrentSlide(0);
            }
        }, config?.autoScroll ?? 5000);
        return () => clearInterval(intervalId);
    }, [canGoNext, config.autoScroll, nextSlide, setCurrentSlide]);

    return (
        <div className={'w-full overflow-x-hidden relative group'}>
            <motion.div
                initial={{ x: 0 }}
                animate={{
                    x: `-${(100 / data.length) * currentSlide || 0}%`,
                }}
                style={{
                    width: `${slideWidth < 100 ? 100 : slideWidth}%`,
                }}
                transition={{
                    type: 'tween',
                    duration: 0.5,
                }}
            >
                <motion.div
                    className={'flex flex-row flex-nowrap'}
                    style={{
                        marginLeft: `-${settings.spacing}px`,
                        marginRight: `-${settings.spacing}px`,
                    }}
                    onWheel={(e) => {
                        if (e.deltaX < -1) {
                            if (scrollTo) return;
                            prevSlide();
                            setScrollTo(true);
                        } else if (e.deltaX > 1) {
                            if (scrollTo) return;
                            nextSlide();
                            setScrollTo(true);
                        } else {
                            setScrollTo(false);
                        }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe =
                            Math.abs(offset.x) > 50 &&
                            Math.abs(velocity.x) > 500;
                        if (swipe && offset.x > 0) prevSlide();
                        else if (swipe) nextSlide();
                    }}
                >
                    {data.length === 0 && (
                        <h5 className="w-full aspect-[4/3] bg-gray-100 dark:bg-navy-700 flex justify-center items-center">
                            No data provided. Please provide data to the slider
                        </h5>
                    )}
                    {data.map((item, index) => {
                        return (
                            <div
                                key={index}
                                style={{
                                    width: `${100 / settings.slidesToShow}%`,
                                    paddingLeft: `${settings.spacing}px`,
                                    paddingRight: `${settings.spacing}px`,
                                }}
                            >
                                {renderItem && renderItem(item, index)}
                            </div>
                        );
                    })}
                </motion.div>
            </motion.div>
            {settings.dots && (
                <SliderPagination
                    slides={data.length - settings.slidesToShow + 1}
                    onChange={setCurrentSlide}
                    activeSlide={currentSlide}
                />
            )}
            {settings.arrows && (
                <SliderNav
                    canGoPrev={canGoPrev}
                    canGoNext={canGoNext}
                    onPrev={prevSlide}
                    onNext={nextSlide}
                />
            )}
        </div>
    );
};

export default Slider;
