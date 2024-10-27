/**
 * Skeleton component
 * @param {string} className - Additional classes default is 'w-full h-full'
 * @returns {JSX.Element}
 */
export function Skeleton({ className = 'w-full h-full' }) {
    return <div className={`animate-pulse bg-gray-300 ${className}`} />;
}
