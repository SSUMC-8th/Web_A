import { CommonResponse } from './common';

export type UploadImageDto = { imageUrl: string };

export type ResponseImageDto = CommonResponse<UploadImageDto>;
