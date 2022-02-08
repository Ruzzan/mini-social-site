import React,{useEffect,useState} from 'react';
import Navbar from '../Navbar';
import ProfileHeader from './Header';
import Post from '../post/Post';
import CreatePost from '../post/Create'
import {getProfile} from './actions';
import {deletePost} from '../post/actions'
import Loader from '../Loader';

const Profile = () => {
    const [posts,setPosts] = useState([]);
    const [user,setUser] = useState({});
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        // fetch profile data
        const fetchProfile = async () =>{
            setLoading(true);
            let response = await getProfile();
            setPosts(response.posts);
            setUser(response.user);
            setLoading(false)
        }
        fetchProfile();
    },[])

    const Delete = async (postId) =>{
        let data = await deletePost(postId)
        if(data) {
            // remove the deleted post and set filtered posts as setPosts
            let filteredPosts = posts.filter((post)=>post.id !== parseInt(postId))
            setTimeout(() => {
                setPosts([...filteredPosts])
            }, 1000);
        }
    }

    return (
        <section>
        <Navbar/>
        <div className="container" id="main__container">
        <div className="row">
        <div className="col-md-4 mx-auto">
        <ProfileHeader username={user.username} 
        email={user.email}
        avatar={user.avatar} 
        bio={user.bio} 
        total_followers={user.total_followers} 
        total_posts={posts.length}  />
        </div>
        </div>
        <div className="row">
        {loading ? <Loader/> : 
        <div className="col-md-6 mx-auto">
        {/* show the create post if no posts */}
        {posts.length < 1 && <div className="mt-3"><CreatePost/></div>}
        {posts.map((post)=>{
            return <Post key={post.id} id={post.id} caption={post.body} image={post.image} total_likes={post.total_likes} userId={user.id} username={user.username} avatar={user.avatar} showDeleteBtn={true}
            handleDelete={()=>Delete(post.id)} showEditBtn={true} />
        })}
        </div> }
        </div>
        </div>
        </section>
    )
}

export default Profile;