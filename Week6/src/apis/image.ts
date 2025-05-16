import { privateAxios, publicAxios } from './axiosInstance';
import { API_UPLOADS } from '../constants/api';
import { ResponseImageDto } from '../types/image';

export const postImagePrivate = async (
    file: File,
): Promise<ResponseImageDto> => {
    const formData = new FormData();
    formData.append('file', file); // file타입

    const { data } = await privateAxios.post(
        API_UPLOADS.PRIVATE_UPLOAD,
        formData,
    );

    return data;
};

export const postImagePublic = async () => {
    const { data } = await publicAxios.post(API_UPLOADS.PUBLIC_UPLOAD);

    return data;
};
