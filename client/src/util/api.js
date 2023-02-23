//Create api
//fetchCreate(전송할 데이터,새로고침 후 돌아올 페이지, endpoint ex)question )
export const fetchCreate = (data, link, endpoint = "") => {
    // fetch(process.env.REACT_APP_API_URL + endpoint, {
    fetch("http://localhost:3000" + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
export const fetchDelete = (id, link) => {
    fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
        method: "DELETE",
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
export const fetchPatch = (id, data, link) => {
    fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(data),
    })
        .then(() => {
            window.location.href = link;
        })
        .catch((error) => {
            console.error("Error", error);
        });
};
