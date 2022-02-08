import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import Navbar from '../Navbar';
import UserLogo from '../../assets/user.png'
import Post from './Post'
import {getPost,postComment,likePost} from './actions';
import Loader from '../Loader'

const PostDetail = () => {
    const {postId} = useParams();
    const [loaded,setLoaded] = useState(false);
    const [post,setPost] = useState({});
    const [commentBody,setCommentBody] = useState('');
    const [comments,setComments] = useState([]);

    useEffect(async () =>{
        // get the post
        let post_ = await getPost(postId);
        setPost(post_);
        setComments(post_.comments);
        if(post !== {}) {
            setLoaded(true)
        }
    },[])

    // like the specific post
    // on click of like btn handleLike props is called and it will call this function
    const postLike = async (postId) => {
        await likePost(postId);
    }

    const handleComment = async () => {
        let payload = {"post":postId,"body":commentBody}
        let comment = await postComment(payload);
        if(comment!==null) {
            setCommentBody('');
            setComments([comment,...comments])
        }
    }

    return (
        <section>
        <Navbar/>
        <div className="container" style={{marginTop:"1em"}}>
        <div className="row">
        <div className="col-md-8 mx-auto">
        {loaded ? <div> 
        <Post 
        key={post.id} 
        id={post.id} 
        caption={post.body} 
        image={post.image} 
        total_likes={post.total_likes} 
        userId={post.author_detail.id} 
        username={post.author_detail.username} 
        avatar={post.author_detail.avatar} 
        handleLike={()=>postLike(post.id)}
        />

        <div style={{margin:"0 5em 3em 5em"}}>
        <div className="d-flex justify-content-start align-item-center">
        <textarea 
        className="form-control p-1" 
        placeholder="Your Comment Here..." 
        style={{border:"none",height:"2em"}}
        onChange={(e)=>setCommentBody(e.target.value)} 
        value={commentBody} />

        <button className="btn__primary" 
        onClick={handleComment}> 
        <i className="fas fa-paper-plane" /> 
        </button>
        </div>
        {/* show all comments of post */}
        {comments.map((comment)=>{
            return (
            <div className="comments" 
            key={comment.id} style={{borderBottom:"1px solid lightgrey"}}>
            <div className="post__header mt-2">
            <img 
            src={comment.author_detail.avatar ? comment.author_detail.avatar :UserLogo} alt="" 
            style={{height:"2em",width:"2em",borderRadius:"50%"}} />
            <p>{comment.author_detail.username}</p>
            </div>
            <div className="post__body">
            <p>{comment.body}</p>
            </div>
            </div>)
        })}
        </div>
        </div>  : <Loader/>}
        </div>
        </div>
        </div>
        </section>
    );
}

export default PostDetail;