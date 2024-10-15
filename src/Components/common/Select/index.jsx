import { cn } from '~/lib/utils';

export function Select({ options, className, ...props }) {
    return (
        <select className={cn(className)} {...props}>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
