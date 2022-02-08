import React,{useContext} from 'react';
import {useState} from 'react';
import UploadImage from '../../assets/upload.png';
import UserImage from '../../assets/user.png';
import {UserContext} from '../../context/UserContext'
import {createPost} from './actions';
import FormData from 'form-data';
import {useNavigate} from 'react-router-dom'
// post create bar
const CreatePost = (props) => {
    const [caption,setCaption] = useState('');
    const [image,setImage] = useState({preview:null,raw:null});

    const [loading,setLoading] = useState(false);

    const {user} = useContext(UserContext);
    let authorID = user.data.user.id;

    const navigate = useNavigate();

    // handle image selection from image field
    const handleImageUpload = (e) => {
        if(e.target.files.length) {
            let img = e.target.files[0];
            setImage({
                preview:URL.createObjectURL(img),
                raw:img
            })
        }
    }

    // upload post action
    const postData = async () => {
        setLoading(true);
        let payload = new FormData();
        payload.append("body",caption);
        image.raw && payload.append("image",image.raw);
        let newPost = await createPost(payload);
        if(newPost) {
            setLoading(false);
            navigate('/post/'+newPost.id)
        } else {
            setLoading(false)
        }
    }

    return (
        <div className="create">
        <div className="create__post">
        <img src={props.avatar ? props.avatar : UserImage} alt="avtar" className="img-fluid me-auto" style={{width:"2.7em",height:"2.7em",borderRadius:"50%"}} />

        <textarea className="form-control" placeholder="Create Post" id="create__input" onChange={e=>setCaption(e.target.value)} />
    
        <label htmlFor="upload__image">
        <img src={UploadImage} alt="upload" style={{height:"2em",width:"2em",marginLeft:"0.3em"}} />
        </label>
        
        <input type="file" accept="image/*" id="upload__image"  style={{display:"none"}} onChange={handleImageUpload} />

        </div>

        {/* show the preview image if image is selected */}
        { image.preview &&  
            <div style={{position:"relative"}}>
            {/* clear the selected image */}
            <i className="fas fa-trash-alt text-danger"
            style={{position:"absolute",top:"2%",right:"1%",cursor:"pointer"}}
            onClick={()=>setImage({preview:null,raw:null})}
            />

            <img src={image.preview} className="img-fluid mt-1 dummy__img" alt="preview" /> 
            </div> 
        }

        <button className="btn__primary" id="post__button" onClick={postData}>
        {loading ? "Posting" : "Post"} <i className="fas fa-upload ms-1"></i> </button>
        </div>
    )
}

export default CreatePost;