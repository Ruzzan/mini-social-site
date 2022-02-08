const ROOT_URL = 'http://127.0.0.1:8000/api'
let user = JSON.parse(localStorage.getItem("auth")) || null;
let authToken = user && user.key;

// get posts
export const getPosts = async (nextPageURL) => {
    let posts = null;
    let url = `${ROOT_URL}/posts/`;
    if(nextPageURL) {
        url = nextPageURL;
    }
    let response = await fetch(url,{
        method:"GET",
        headers:{
            'Accept':'application/json',
            'Authorization': 'Token ' + authToken.toString(),
        }
    });

    posts = await response.json();
    return posts;
}

// get post 
export const getPost = async (postId) =>{
    let response = await fetch(`${ROOT_URL}/posts/${postId}`,{
        method:"GET",
        headers:{
            'Accept':'application/json',
            'Authorization': 'Token ' + authToken.toString(),
        }
    });

    let post = await response.json();
    return post;
}

// create post
export const createPost = async (payload) => {
    let post = null;
    const response = await fetch(`${ROOT_URL}/posts/`,{
            method:"POST",
            headers:{
               // 'Content-Type':'multipart/form-data',
                'Authorization': 'Token ' + authToken,
            },
            body:payload,
        }) //.then((response)=>response.json()).then((data)=>console.log(data))
    post = await response.json();
    return post;
}

// delete post
export const deletePost = async (postId) => {
    const response = await fetch(`${ROOT_URL}/posts/${postId}/`,{
        method:"DELETE",
        headers:{
            'Authorization': 'Token ' + authToken,
        },
    })
    let status = response.status;
    if(status === 204) {
        return status
    }
    return null;
}

// edit post
// get the editing post 
export const getEditingPost = async (postId) => {
    let response = await fetch(`${ROOT_URL}/posts/edit/${postId}/`,{
        method:"GET",
        headers:{
            'Accept':'application/json',
            'Authorization': 'Token ' + authToken.toString(),
        }
    });
    if(response.status===404) {
        return null
    } else {
        let post = await response.json();
        return post
    }
}

// send the PATCH request
export const editPost = async (payload,postId) => {
    let url = `${ROOT_URL}/posts/edit/${postId}/`;
    let response = await fetch(url,{
        method:"PATCH",
        headers:{
           'Content-Type':'application/json',
            'Authorization': 'Token ' + authToken.toString(),
        },
        body:JSON.stringify(payload)
    });
    return response.status === 200 ? response.json() : null;
}

// like post 
export const likePost = async (postId) => {
    const response = await fetch(`${ROOT_URL}/posts/like/${postId}/`,{
        method:"GET",
        headers:{
            'Authorization': 'Token ' + authToken,
        },
    })
    if(response.status === 200) {
        let data = await response.json();
        return data;
    }
    return null
}

export const postComment = async (payload) => {
    const response = await fetch(`${ROOT_URL}/posts/comment/`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Token ' + authToken,
        },
        body:JSON.stringify(payload)
    })
    if(response.status === 201) {
        let data = await response.json();
        return data;
    }
    return null
}

export const searchResults = async (postQuery,userQuery) => {
    let url = `${ROOT_URL}/search?post=${postQuery}&user=`;
    if(postQuery && userQuery) {
        url = `${ROOT_URL}/search?post=${postQuery}&user=${userQuery}`;
    } else if(userQuery && !postQuery) {
        url = `${ROOT_URL}/search?post=&user=${userQuery}`;
    }
    const response = await fetch(url,{
        method:"GET",
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Token ' + authToken,
        }, 
    })
    return response.json();
}