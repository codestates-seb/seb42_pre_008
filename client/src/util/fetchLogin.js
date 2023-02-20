export const fetchLogin = async (data) => {
    return fetch(`auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
        },
        body: data,
    })
    .then((res) => {
        if (!res.ok) {
            console.log(res);
            if (res.status === 401) alert('이메일 또는 비밀번호가 틀렸습니다.', '확인해주세요')
            throw Error('fetch the data for that resource')
        }
        if(res.status === 200) {
            alert('로그인 되었습니다.')
            
            const accessToken = res.headers.get('Authorization');
            const refreshToken = res.headers.get('refresh');
            sessionStorage.setItem('access_token', accessToken);
            sessionStorage.setItem('refresh_token', refreshToken);
        }
        return res;
    })
    .catch((err) => {
        console.error(err.message); 
    })
}


export const fetchUserInfo = async () => {
    return fetch(`/accounts/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
            authorization: sessionStorage.getItem('access_token'),
        },
    })
    .then((res) => {
        if(!res.ok) {
            throw Error('could not fetch the data for that resource');
        }
        return res.json();
    })
    .catch((err) => {
        console.error(err.message);
    });
}

export const checkLogined = async () => {
    return await fetchUserInfo().then((data) => {
        if(!data) {
            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
            alert('로그인을 해주세요.')
        }
    })
}