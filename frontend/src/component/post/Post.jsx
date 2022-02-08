import React,{useState} from 'react';
import UserLogo from '../../assets/user.png';
import {Link} from 'react-router-dom';

const Post = (props) => {
    const [liked,setLiked] = useState(false); //like post from List and all
    const [totalLikes,setTotalLikes] = useState(props.total_likes);
    const [deleted,setDeleted] = useState(false) // delete post from Profile page

    const likePost = () => {
        props.handleLike();
        setLiked(!liked);
        // if liked already remove one the like
        if(liked) {
            setTotalLikes(totalLikes-1)
        } else {
            setTotalLikes(totalLikes+1);
        }
    }

    const deletePost = () => {
        // handleDelete = props that is called in post profile component that will handle the delete api  
        props.handleDelete();
        setDeleted(true) // fades out the deleted post 
    }

    return (
        <div className={deleted ? "post__card deleted" : "post__card"  }>
        <div className="post__header">
        <img src={props.avatar ? props.avatar : UserLogo} alt="" style={{height:"2em",width:"2em",borderRadius:"50%"}} />
        <Link to={"/user/"+props.userId} className="text-dark ms-1">{props.username}</Link>
        </div>

        <div className="post__body">
        <p>{props.caption}</p>
        
        {props.image && <img className="img-fluid" src={props.image} alt="" style={{width:"100%",height:"21em"}} />}
        
        </div>      

        <div className="post__action">
        <span onClick={likePost}>
        <i 
        className={liked ? "fas fa-heart text-primary" : "far fa-heart text-primary"} />  {totalLikes} 
        </span>

        <Link to={"/post/"+props.id} className="ms-4"> 
        <i className="far fa-comment text-success" />
        </Link> 
        {/* show edit btn if showEditBtn is true*/}
        { 
            props.showEditBtn &&
            <Link to={"/post/edit/"+props.id}  className="ms-4">
            <i className="far fa-edit text-warning" /> 
            </Link>
        }

        {/* show delete btn if showDeleteBtn is true and call deletePost when clickd */}
        { 
        props.showDeleteBtn &&
        <span onClick={deletePost} className="ms-4">
        <i className="far fa-trash-alt text-danger" /> 
        </span>
        }
        </div>

        </div>
    )
}

export default Post;