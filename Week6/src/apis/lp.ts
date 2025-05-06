import { ResponseLpDto, ResponseLpDetailDto } from '../types/lp';
import { axiosInstance } from './axios';

/* 리스트 */
export const getLpInfo = async (): Promise<ResponseLpDto> => {
    const { data } = await axiosInstance.get('/v1/lps');
    return data;
};

/* 상세 */
export const getLpDetail = async (
    lpId: number,
): Promise<ResponseLpDetailDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
    return data;
};
