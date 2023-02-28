import { atom } from "recoil";
import axios from "axios";

const api = atom({
   key: 'api',
   default: 'server url/',
});
export default api;
//Create api
//fetchCreate(전송할 데이터,새로고침 후 돌아올 페이지, endpoint ex)question )
export const fetchCreate = (url,data,link,) => {
    fetch(url , {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(data),
        credentials: "include" 
    })
        .then(() => {
            window.location.href = link;
        })
        .catch((error) => {
            console.error("Error", error);
        });
};

//Delete api
//fetchDelete(endpoint,새로고침 후 돌아올 페이지)
export const fetchDelete = (url, link) => {
    fetch(url, {
        method: "DELETE",
        credentials: "include",
    })
        .then(() => {
            window.location.href = link;
        })
        .catch((error) => {
            console.error("Error", error);
        });
};

//Patch api
//fetchDelete(endpoint,전송할 데이터, 새로고침후 돌아올 페이지)
export const fetchPatch = (url, data, link) => {
    fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(data),
        credentials: "include",
    })
    .then(() => {
      window.location.href = link;
    })
    .catch((error) => {
      console.error('Error', error);
    })
}

export const LoginAPI = async (data) => {
    const response = await axios.post(`https://c356-61-73-131-137.jp.ngrok.io/auth/login`, data).catch((error) => {
        console.log(error.response, 'res');
        return error.response;
    });
    return response
}