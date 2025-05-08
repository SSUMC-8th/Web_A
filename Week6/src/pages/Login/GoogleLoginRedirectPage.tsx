import { useEffect } from 'react';
import { LOCAL_STORAGE_KEY } from '../../constants/key';
import { localStorageUtil } from '../../utils/localStorageUtil';
import ROUTES from '../../constants/routes';

const GoogleLoginRedirectPage = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
        const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

        if (accessToken && refreshToken) {
            localStorageUtil.setItem(
                LOCAL_STORAGE_KEY.accessToken,
                accessToken,
            );
            localStorageUtil.setItem(
                LOCAL_STORAGE_KEY.refreshToken,
                refreshToken,
            );
            window.location.href = ROUTES.HOME;
        }
    }, []);

    return <></>;
};

export default GoogleLoginRedirectPage;
