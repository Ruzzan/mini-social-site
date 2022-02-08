const ROOT_URL = 'http://127.0.0.1:8000/api'
let user = JSON.parse(localStorage.getItem("auth")) || null;
let authToken = user && user.key;

// get posts
export const getProfile = async () => {
    let data = null;
    let url = `${ROOT_URL}/user/profile`;
    let response = await fetch(url,{
        method:"GET",
        headers:{
            'Accept':'application/json',
            'Authorization': 'Token ' + authToken.toString(),
        }
    });

    data = await response.json();
    return data;
}

export const getUser = async (userId) => {
    let data = null;
    let url = `${ROOT_URL}/user/${userId}`;
    let response = await fetch(url,{
        method:"GET",
        headers:{
            'Accept':'application/json',
            'Authorization': 'Token ' + authToken.toString(),
        }
    });

    data = await response.json();
    return data;
}

export const followUser = async (userId) => {
    let data = null;
    let url = `${ROOT_URL}/user/follow/${userId}/`;
    let response = await fetch(url,{
        method:"GET",
        headers:{
            'Accept':'application/json',
            'Authorization': 'Token ' + authToken.toString(),
        }
    });
    if(response.status === 200) {
        data = await response.json();
    }
    return data;
}

export const updateUser = async (payload) => {
    let data = null;
    let url = `${ROOT_URL}/user/update/`;
    let response = await fetch(url,{
        method:"PATCH",
        headers:{
           // 'Content-Type':'multipart/form-data',
            'Authorization': 'Token ' + authToken.toString(),
        },
        body:payload
    });
    data = response.json();
    return data;
}