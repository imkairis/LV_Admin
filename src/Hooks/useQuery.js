import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import toast from 'react-hot-toast';

export const useQueryDefault = ({ keys, fn, options }) => {
    const query = useQuery({
        queryKey: [...keys],
        queryFn: (...props) => fn(...props),
        staleTime: options?.slateTime || 1000 * 60 * 5, // 5 minutes
        keepPreviousData: true,
        refetchOnWindowFocus: options?.refetchOnFocus || false,
    });
    return query;
};

export const configQuery = {
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
};

export const useMutationAndToast = ({
    keys,
    fn,
    onSuccess = () => {},
    loadingString = 'Loading...',
    successString = 'Success',
    failString = 'Failed',
}) => {
    const toastId = useRef(null);
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (data) => fn(data),
        retryDelay: 1000, // 1 second
        onMutate: () => {
            toastId.current = toast.loading(loadingString);
        },
        onError: (error) => {
            toast.dismiss(toastId.current);
            toast.error(error?.message || failString);
        },
        onSuccess: () => {
            onSuccess();
            toast.dismiss(toastId.current);
            toast.success(successString);
            queryClient.invalidateQueries({
                queryKey: [...keys],
            });
        },
    });
    return mutation;
};
