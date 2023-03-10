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
        // .then(() => {
        //  window.location.href = link;
        // })
        .catch((error) => {
            console.error("Error", error);
        });
};
