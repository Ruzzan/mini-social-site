import React,{useState} from 'react';
import {useLocation} from 'react-router-dom';
import UserLogo from '../../assets/user.png'
import {followUser,updateUser} from './actions'
import {useFormik} from 'formik';
import FormData from 'form-data';

const ProfileHeader = (props) => {
    let isProfilePage = useLocation().pathname;

    const [image,setImage] = useState(''); // image use to update avatar

    const [updated,setUpdated] = useState(false);
    const [loading,setLoading] = useState(false);

    const [followStatus,setFollowStatus] = useState(props.followState); // follow status of current user

    // const [user,setUser] = useState({
    //     username:null,
    //     email:null,
    //     bio:null,
    //     avatar:null,
    //     })

    // handle image selection
    const handleImageUpload = (e) => {
        if(e.target.files.length) {
            let img = e.target.files[0]; // raw image used for posting data
            setImage(img);
        }
    }

    // this will handle the follow unfollow of user
    const handleFollow = async () => {
        const data = await followUser(props.userId)
        if(data) {
            setFollowStatus(!followStatus)
        }
    }

    // initial data = values fetch from api 
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            username:props.username ? props.username : "",
            email:props.email ? props.email : "",
            bio:props.bio ? props.bio : "",
        },
        onSubmit: async (values) => {
            let form = new FormData();
            form.append("username",values.username)
            form.append("email",values.email)
            form.append("bio",values.bio)
            if(image) {
                form.append("avatar",image)
            }
            setLoading(true);
            let data =  await updateUser(form);
            if(data) {
           // setUser(data);
            setUpdated(true);
            setLoading(false);
            }
        }
    })


    return (
        <div className="d-flex justify-content-start align-items-center">
        <img className="img-fluid" 
        src={props.avatar ? props.avatar : UserLogo} 
        alt="profile" style={{width:"5em",height:"5em",borderRadius:"50%"}} />
        <div className="ms-4">
        <span style={{fontFamily:"Roboto"}}>{props.username}</span>
        { 
        isProfilePage === '/profile' ? 
        <button className="btn__primary ms-2" 
        style={{padding:"0.2em 0.3em"}}  
        data-bs-toggle="modal" 
        data-bs-target="#exampleModal"> Edit Profile </button> 
        :
        <button
        className="btn__primary ms-2" 
        style={{padding:"0.2em 0.3em"}} 
        onClick={handleFollow}> 
        {followStatus ? "Unfollow" : "Follow"} 
        </button> 
        } 
        <br/>
        <span style={{fontFamily:"Ubuntu",marginTop:"0.5em"}}>
        {props.total_followers} Followers | {props.total_posts} Posts</span>
        <p>{props.bio}</p>
        </div>
      
    {/* update form modal */}
    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form onSubmit={formik.handleSubmit}>
      <input className="form-control" 
      name="username" placeholder="Username" 
      onChange={formik.handleChange} value={formik.values.username} />

      <input type="email" className="form-control my-2" 
      name="email" placeholder="Email" 
      onChange={formik.handleChange} value={formik.values.email} />

      <input type="text" 
      className="form-control my-2" name="bio" placeholder="Bio"
      onChange={formik.handleChange} value={formik.values.bio} />

      <input type="file" accept="img/*" name="avatar" placeholder="Avatar" 
      onChange={handleImageUpload} />
      
      <button type="submit" className="btn__primary mt-2 d-block">
      {loading ? "Updating" : "Update"} <i className="fas fa-upload"/>
      </button>
      {updated && "Updated Successfully"}
      </form>
      </div>
    </div>
    </div>
    </div>
        
    </div>
    )
}

export default ProfileHeader;