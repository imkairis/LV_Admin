import { useEffect, useMemo } from 'react';
import Slider from '~/Components/Slider';

function SliderImageAddProduct({ images }) {
    const convertImages = useMemo(() => {
        if (!images || !images?.length) return [];
        return Array.from(images).map((image) => URL.createObjectURL(image));
    }, [images]);

    useEffect(() => {
        return () => {
            if (!images || !images?.length) return;
            for (const image of images) {
                URL.revokeObjectURL(image);
            }
        };
    }, [images]);

    return (
        // <div className="w-full aspect-[4/3] overflow-hidden border max-w-2xl mx-auto">
        //     {/* <Slider images={convertImages} /> */}
        // </div>
        <Slider
            config={{
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                spacing: 0,
            }}
            data={convertImages}
            renderItem={(item) => (
                <div className="w-full aspect-[4/3]">
                    <img
                        src={item}
                        alt="Product"
                        className="object-cover w-full h-full"
                    />
                </div>
            )}
        />
    );
}

export default SliderImageAddProduct;
