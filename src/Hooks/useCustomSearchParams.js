import { useSearchParams } from 'react-router-dom';
import { getValueFromSearchParams } from '~/lib/utils';

export const useCustomSearchParams = (values) => {
    const [searchParams, setSearchPrams] = useSearchParams();
    const result = getValueFromSearchParams(searchParams, values);
    return {
        searchParams,
        setSearchPrams,
        ...result,
    };
};
