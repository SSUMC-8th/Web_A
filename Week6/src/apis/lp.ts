import { API_COMMENTS, API_LPS } from '../constants/api';
import { SortOrder } from '../constants/sort';
import {
    ResponseLpDto,
    ResponseLpDetailDto,
    ResponseCommentDto,
    CreateLpDto,
    ResponsePostCommentDto,
    ResponsePatchCommentDto,
} from '../types/lp';
import { privateAxios, publicAxios } from './axiosInstance';

interface GetLpInfoParams {
    cursor?: number | null;
    limit?: number;
    order?: SortOrder.LATEST | SortOrder.OLDEST;
}

export const getLpInfo = async ({
    cursor = null,
    limit = 12,
    order = SortOrder.LATEST,
}: GetLpInfoParams): Promise<ResponseLpDto> => {
    const { data } = await publicAxios.get(API_LPS.LIST, {
        params: {
            cursor,
            limit,
            order,
        },
    });
    console.log(data);
    return data;
};

export const getLpDetail = async (
    lpId: number,
): Promise<ResponseLpDetailDto> => {
    const { data } = await publicAxios.get(API_LPS.DETAIL(lpId));
    return data;
};

interface GetCommentsParms extends GetLpInfoParams {
    lpId: number;
}

export const getComments = async ({
    lpId,
    cursor = null,
    limit = 10,
    order = SortOrder.LATEST,
}: GetCommentsParms) => {
    const { data } = await privateAxios.get<ResponseCommentDto>(
        API_COMMENTS.LIST(lpId),
        { params: { cursor, limit, order } },
    );
    return data;
};

export const postComment = async ({
    lpId,
    content,
}: {
    lpId: number;
    content: string;
}) => {
    const { data } = await privateAxios.post<ResponsePostCommentDto>(
        API_COMMENTS.CREATE(lpId),
        { content },
    );
    return data;
};

export const patchComment = async ({
    lpId,
    commentId,
    content,
}: {
    lpId: number;
    commentId: number;
    content: string;
}) => {
    const { data } = await privateAxios.patch<ResponsePostCommentDto>(
        API_COMMENTS.UPDATE(lpId, commentId),
        { content },
    );
    return data;
};

export const deleteComment = async ({
    lpId,
    commentId,
}: {
    lpId: number;
    commentId: number;
}) => {
    const { data } = await privateAxios.delete<ResponsePatchCommentDto>(
        API_COMMENTS.DELETE(lpId, commentId),
    );

    return data;
};

export const postLp = async ({
    title,
    content,
    thumbnail,
    tags,
    published = true,
}: CreateLpDto) => {
    const { data } = await privateAxios.post(API_LPS.CREATE, {
        title,
        content,
        thumbnail,
        tags,
        published,
    });

    return data;
};
