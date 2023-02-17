
//read기능 구현후 작성하기
export const fetchCreate = (url, data,link) => {
    fetch(url, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(data)
    })
    .then(() => {
        window.location.href = link;
    })
    .catch((error) => {
        console.error('Error', error);
    })
}

export const fetchDelete = (endpoint, id) => {
    fetch(`${process.env.REACT_APP_API_URL}${id}`, {
      method: "DELETE",
    })
    .then(() => {
      window.location.href = `${process.env.REACT_APP_API_URL}`;
    })
    .catch((error) => {
      console.error('Error', error);
    })
}

export const fetchPatch = (url, id, data) => {
    fetch(`${url}${id}`, {
      method : "PATCH",
      headers: {"Content-Type" : "Application/json"},
      body: JSON.stringify(data)
    })
    .catch((error) => {
      console.error('Error', error);
    })
}