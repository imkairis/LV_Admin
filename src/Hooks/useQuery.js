import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export const useQueryDefault = ({
    keys,
    fn,
    page = 1,
    limit = 10,
    ...props
}) => {
    const token = useSelector((state) => state.auth.token);
    const query = useQuery({
        queryKey: [...keys],
        queryFn: () => fn({ token, page, limit, ...props }),
        staleTime: 1000 * 60 * 5, // 5 minutes
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });
    return query;
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
    const token = useSelector((state) => state.auth.token);
    const mutation = useMutation({
        mutationFn: (data) => fn({ token, ...data }),
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
