import { useState, useEffect } from 'react';

const UseFetch = (endpoint = '') => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            //이부분 본인 서버 링크로 수정
        fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, { signal: abortCont.signal })
        .then(res => {
            if (!res.ok) { 
                throw Error('could not fetch the data for that resource');
            } 
            return res.json();
        })
        .then(data => {
            setIsPending(false);
            setData(data);
            setError(null);
        })
        .catch(err => {
            setIsPending(false);
            setError(err.message);
        })
        }, 1000);

        return () => abortCont.abort();
    }, [endpoint])

  return [ data, isPending, error ];
}

 
export default UseFetch;