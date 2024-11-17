import { memo, useEffect, useMemo } from 'react';
import Slider from '~/Components/Slider';

const API_URL = import.meta.env.VITE_API_URL;

function SliderImageAddProduct({
    images,
    isEditMode,
    setRemoveImages,
    setFieldValue,
}) {
    const convertImages = useMemo(() => {
        if (!images || !images?.length) return [];
        return Array.from(images).map((image) => {
            if (typeof image === 'string') return `${API_URL}/${image}`;
            return URL.createObjectURL(image);
        });
    }, [images]);

    useEffect(() => {
        return () => {
            if (!images || !images?.length) return;
            for (const image of images) {
                if (typeof image === 'string') continue;
                URL.revokeObjectURL(image);
            }
        };
    }, [images]);

    const handleRemoveImage = (image) => {
        if (typeof image === 'string') {
            setRemoveImages((prev) => [...prev, image]);
        }
        console.log('images', images);
        console.log('image', image);

        // setFieldValue(
        //     'images',
        //     images.filter((i) => i !== image)
        // );
    };

    return (
        <Slider
            config={{
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                spacing: 0,
            }}
            data={convertImages}
            renderItem={(item) => (
                <div className="w-full aspect-[4/3] relative">
                    <img
                        src={item}
                        alt="Product"
                        className="object-cover w-full h-full"
                    />
                    {isEditMode && (
                        <button
                            type="button"
                            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full"
                            onClick={() => handleRemoveImage(item)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            )}
        />
    );
}

export default memo(SliderImageAddProduct);
