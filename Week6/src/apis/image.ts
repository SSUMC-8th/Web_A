import { API_UPLOADS } from '../constants/api';
import { ResponseImageDto } from '../types/image';
import { privateAxios } from './axiosInstance';

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
