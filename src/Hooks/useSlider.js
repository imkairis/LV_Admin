import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for slider
 * @param {Array} data - Data to be displayed in the slider
 * @param {Object} config - Configuration for the slider {
 *      slidesToShow: Number,
 *      slidesToScroll: Number,
 *      infinite: Boolean,
 *      dots: Boolean,
 *      arrows: Boolean,
 *      spacing: Number
 * }
 * @param {Array} responsiveConfig - Responsive configuration for the slider
 */
export const useSlider = (data, config, responsiveConfig = []) => {
    console.log('config', config);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [canGoNext, setCanGoNext] = useState(false);
    const [canGoPrev, setCanGoPrev] = useState(false);
    const [scrollTo, setScrollTo] = useState(false);
    const [resized, setResized] = useState(false);

    const [settings, setSettings] = useState({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
        arrows: true,
        spacing: 0,
        responsive: [],
        ...config,
    });

    console.log('settings', settings);

    const nextSlide = () => {
        if (!canGoNext) return;
        setCurrentSlide((prev) => (prev + 1) % data.length);
    };

    const prevSlide = () => {
        if (!canGoPrev) return;
        setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
    };

    useEffect(() => {
        if (settings.infinite) {
            setCanGoNext(true);
            setCanGoPrev(true);
        } else {
            setCanGoNext(currentSlide < data.length - settings.slidesToShow);
            setCanGoPrev(currentSlide > 0);
        }
    }, [settings.infinite, settings.slidesToShow, currentSlide, data.length]);

    const slideWidth = (100 * data.length) / settings.slidesToShow;

    const handleResize = useCallback(() => {
        const width = window.innerWidth;
        if (responsiveConfig.length === 0) return;

        const responsiveSettings = responsiveConfig.find(
            (item) => item.breakpoint < width
        );

        if (responsiveSettings) {
            setSettings({
                ...settings,
                ...responsiveSettings.settings,
            });
        }
    }, [responsiveConfig, settings]);

    useEffect(() => {
        if (!resized) {
            handleResize();
            setResized(true);
            return;
        }
    }, [handleResize, resized]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return {
        currentSlide,
        canGoNext,
        canGoPrev,
        scrollTo,
        settings,
        slideWidth,
        setScrollTo,
        setCurrentSlide,
        nextSlide,
        prevSlide,
    };
};
