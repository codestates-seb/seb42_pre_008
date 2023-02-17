import { useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom';
import Summary from "./Summary";


const Actives = () => {
    const { id } = useParams();
    const [idData, setIdData] = useState();
    const [currentTab, setCurrentTab] = useState(0);

    const menuArray = [
        {name: "Summary", content: <Summary />},
        {name: 'Answers', content: <></>},
        {name: 'Questions', content: <></>},
    ];

    const selectMenuHandler = (index) => {
        setCurrentTab(index); 
    }

    useEffect(() => {
        fetch(`/accounts/${id}`)
        .then((res) => {
            if(!res.ok) {
                throw Error('could not fetch the data for that resource')
            }
            return res.json();
        })
        .then((idData) => {
            setIdData(idData);
        })
        .catch((err) => {
            console.error(err.message);
        });
    }, []);  // 안되면 안에 id 넣어보기 . 


    const login = () => {
        return sessionStorage.userEmail === idData?.email;
    }
    const isLogin = {true: '', false: 'invisible'};

    return (
        <>
        <div className="w-full mb-28">
            <ul>
                <li>
                <Link to={`/mypage/${id}/actives`}>
                    <button className="m-0.5 py-1.5 px-3 bg-primary-4000 rounded-2xl hover:bg-primary-700 text-white">
                        Active
                    </button>
                </Link>
                </li>
                <li className={isLogin[login() ?? false]}>
                    <Link to={`/mypage/${id}/setting`}>
                        <button className="m-0.5 py-1.5 px-3 hover:bg-soGray-normal hover:rounded-2xl">
                            setting
                        </button>
                    </Link>
                </li>
            </ul>

            <div className="flex">
                <nav className="my-3 ml-3 mr-8">
                    <div className="flex flex-col">
                        {menuArray.map((ele, index) => {
                            return (
                                <button key={index} className={
                                    currentTab === index
                                    ? 'py-1.5 pr-12 pl-3 m-0.5 bg-soGray-bg rounded-2xl'
                                    : 'py-1.5 pr-12 pl-3 m-0.5 hover:bg-soGray-light hover:rounded-2xl'
                                }
                                onClick={() => selectMenuHandler(index)}
                                >
                                    {ele.name}
                                </button>
                            )
                        })}
                    </div>
                </nav>
                        {menuArray[currentTab].content}
            </div>


        </div>
        </>
    )


}
export default Actives;