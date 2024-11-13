const URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/v1';

export function ProductImage({
    className = 'w-full h-full object-cover',
    src,
    ...props
}) {
    return (
        <img
            className={`${className} mix-blend-darken dark:mix-blend-normal`}
            src={`${URL}/${src}`}
            {...props}
        />
    );
}
