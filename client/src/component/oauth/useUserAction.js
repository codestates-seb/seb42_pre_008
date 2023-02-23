import { useSetRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import authAtom from './auth';
import userAtom from './userAuth';

export default function useUserActions() {
    const baseUrl = `url`;
       // eslint-disable-next-line react-hooks/rules-of-hooks
    function translateToken() {
               // eslint-disable-next-line react-hooks/rules-of-hooks
        const auth = useRecoilValue(authAtom);
       // eslint-disable-next-line react-hooks/rules-of-hooks
        const userAuth = useRecoilValue(userAtom);
               // eslint-disable-next-line react-hooks/rules-of-hooks
        const setUserAuth = useSetRecoilState(userAuth);
        axios
            .get(
                'url',
                {
                    headers: { accessToken: auth },
                },
            )
            .then((response) => {
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                setUserAuth(response.data);
            })
            .catch((error) => {
                alert(error);
            });
    }

    function naverLogin() {
        const NAVER_LOGIN_URL = `${baseUrl}/oauth2/authorization/naver`;
        window.location.href = NAVER_LOGIN_URL;
    }

    function githubLogin() {
        const GITHUB_LOGIN_URL = `url`;
        window.location.href = GITHUB_LOGIN_URL;
    }

    function googleLogin() {
        const GOOGLE_LOGIN_URL = `${baseUrl}/oauth2/authorization/google`;
        window.location.href = GOOGLE_LOGIN_URL;
    }

    return {
        naverLogin,
        githubLogin,
        googleLogin,
        translateToken,
    };
}