import { useEffect, useState } from 'react';

import type { AxiosRequestConfig } from 'axios';

import axiosClient from '@/apis/axiosClinet';

export const useFetch = <T>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const { data } = await axiosClient.get(url, {
          ...options,
        });
        setData(data);
      } catch {
        setError('에러 ㅅㄱㅇ');
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
    console.log('데이터불러옴');
  }, [options, url]);

  return { data, error, isPending };
};
