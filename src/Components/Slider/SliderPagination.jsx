import { motion } from 'framer-motion';

const SliderPagination = ({ slides, activeSlide, onChange }) => {
    return (
        <motion.div className="flex w-full gap-1 justify-center absolute bottom-2 scale-90 group-hover:scale-110 duration-500">
            {Array.from({ length: slides }).map((_, index) => (
                <motion.button
                    type="button"
                    onClick={() => onChange(index)}
                    key={index}
                    animate={{
                        width: `${activeSlide === index ? '1.5' : '0.75'}rem`,
                    }}
                    transition={{
                        duration: 0.25,
                        type: 'tween',
                    }}
                    className={`h-3 rounded-full bg-gray-200 ${
                        activeSlide === index ? 'bg-gray-500' : ''
                    }`}
                />
            ))}
        </motion.div>
    );
};

export default SliderPagination;
