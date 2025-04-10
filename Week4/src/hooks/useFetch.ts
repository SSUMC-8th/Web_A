import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function useFetch<T>(url: string | undefined, page?: number) {
    const fetcher = async (): Promise<T> => {
        if (!url) throw new Error('URL is undefined');

        const response = await axios.get(`${url}${`?page=${page}`}`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
        });

        return response.data;
    };

    const { data, isPending, isError } = useQuery({
        queryKey: [url, page],
        queryFn: fetcher,
        enabled: !!url,
        staleTime: 1000 * 60 * 3,
    });

    return { data, isPending, isError };
}

export default useFetch;
