import { LOCAL_STORAGE_KEY } from '../constants/key';
import { localStorageUtil } from './localStorageUtil';

export const tokenStorage = {
  getAccessToken: (): string | null =>
    localStorageUtil.getItem(LOCAL_STORAGE_KEY.accessToken),

  setAccessToken: (token: string | null) =>
    localStorageUtil.setItem(LOCAL_STORAGE_KEY.accessToken, token),

  getRefreshToken: (): string | null =>
    localStorageUtil.getItem(LOCAL_STORAGE_KEY.refreshToken),

  setRefreshToken: (token: string | null) =>
    localStorageUtil.setItem(LOCAL_STORAGE_KEY.refreshToken, token),

  clear: () => {
    localStorageUtil.removeItem(LOCAL_STORAGE_KEY.accessToken);
    localStorageUtil.removeItem(LOCAL_STORAGE_KEY.refreshToken);
  },
};
