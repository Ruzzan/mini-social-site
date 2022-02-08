import React,{useState,useEffect,useContext} from 'react';
import Navbar from '../Navbar';
import ProfileHeader from './Header';
import Post from '../post/Post';
import {getUser} from './actions';
import Loader from '../Loader';
import {useParams,useNavigate} from 'react-router-dom'
import {UserContext} from '../../context/UserContext'

const UserDetail = () => {
    const [posts,setPosts] = useState([]);
    const [userDetail,setUserDetail] = useState({}); // fetched user value 
    const [loading,setLoading] = useState(false);

    const {userId} = useParams();
    const navigate = useNavigate();

    let {user} = useContext(UserContext) // authenticated user
    let currentUserId = user.data.user.id;

    
    useEffect(()=>{
        // if user detail id == current logged in user id  redirect to profile 
        if(parseInt(userId)===currentUserId) {
            return navigate('/profile')
        }
        // fetch the data of user detail
        const fetchUser = async () =>{
            setLoading(true);
            let response = await getUser(userId);
            setPosts(response.posts);
            setUserDetail(response.user);
            setLoading(false)
        }
        fetchUser();
    },[userId])

    return (
        <section>
        <Navbar/>
        <div className="container" id="main__container">
        <div className="row">
        {loading ? <Loader/> :
        <div className="col-md-4 mx-auto">
        <ProfileHeader 
        userId={userDetail.id} 
        username={userDetail.username}
        email={userDetail.email} 
        avatar={userDetail.avatar} 
        bio={userDetail.bio} 
        total_followers={userDetail.total_followers} 
        total_posts={posts.length}
        followState={userDetail.is_following}
        />
        </div>
        }
        </div>
        <div className="row">
        {loading ? <Loader/> : 
        <div className="col-md-6 mx-auto">
        {posts.map((post)=>{
            return <Post key={post.id} id={post.id} caption={post.body} image={post.image} total_likes={post.total_likes} userId={userDetail.id} username={userDetail.username} avatar={userDetail.avatar}  />
        })}
        </div> }
        </div>
        </div>
        </section>
    )
}

export default UserDetail;