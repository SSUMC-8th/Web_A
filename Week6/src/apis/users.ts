import { API_USERS } from '../constants/api';
import { privateAxios } from './axiosInstance';

interface patchUsersProps {
    name: string;
    bio: string;
    avatar: string;
}

export const patchUsers = async ({ name, bio, avatar }: patchUsersProps) => {
    const { data } = await privateAxios.patch(API_USERS.UPDATE_USER, {
        name,
        bio,
        avatar,
    });

    return data;
};

export const deleteUser = async () => {
    const { data } = await privateAxios.delete(API_USERS.DELETE_USER);

    return data;
};
