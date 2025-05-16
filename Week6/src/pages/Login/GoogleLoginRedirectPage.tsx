import { useEffect } from 'react';
import { LOCAL_STORAGE_KEY } from '../../constants/key';
import ROUTES from '../../constants/routes';
import { tokenStorage } from '../../utils/tokenStorage';

const GoogleLoginRedirectPage = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
        const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

        if (accessToken && refreshToken) {
            tokenStorage.setAccessToken(accessToken);
            tokenStorage.setRefreshToken(refreshToken);
            window.location.href = ROUTES.HOME;
        }
    }, []);

    return <></>;
};

export default GoogleLoginRedirectPage;
