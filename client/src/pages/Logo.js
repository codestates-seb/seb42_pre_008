import {Link} from 'react-router-dom';
import React from 'react';

function Logo() {

    // 나중에 useFetch 이용해서 로고 클릭시 홈으로 가게 만들고 클릭 이벤트 추가 예정. 


    return (
        <div>
            <Link   
            to="/"
            className='cursor-pointer pb-[6px] px-2 flex items-center bg-transparent w-[166px] h-[47px] hover:bg-[hs1(210,8%,90%)'

            >
                <img alt="stack over flow logo"
                src="/image/logo.png"
                className='w-[150px] h-[30px]'
                />
            </Link>
        </div>
    )
}

export default Logo;