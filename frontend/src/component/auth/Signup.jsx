import React,{useState} from 'react';
import Navbar from '../Navbar';
import {Link,useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';
import {signupUser} from './actions';

const Signup = () => {
    const [err,setErr] = useState(false);
    const [loading,setLoading] = useState(false);
    let navigator = useNavigate();
    const formik = useFormik({
        initialValues:{
            username:"",
            email:"",
            password1:"",
            password2:"",
        },

       onSubmit: async (values) =>{
         setLoading(true);
          let newUser = await signupUser(values);
          if(newUser) {
              navigator('/login');
          } else {
              setErr(true);
              setLoading(false);
          }
       }
        
    })
    return (
        <section>
        <Navbar/>
        <div className="container" id="main__container">
        <div className="row">
        <div className="col-md-4 mx-auto">
        <form onSubmit={formik.handleSubmit} className="card p-2" style={{background:"#fff"}}>
        <h4 style={{fontFamily:"Ubuntu"}}>Signup</h4>
        <input type="text" name="username" className="form-control" placeholder="Username" onChange={formik.handleChange} value={formik.values.username} />
        <input type="email" name="email" className="form-control mt-2" placeholder="Email" onChange={formik.handleChange} value={formik.values.email} />
        <input type="password" name="password1" className="form-control mt-2" placeholder="Password" onChange={formik.handleChange} value={formik.values.password1} />
        <input type="password" name="password2" className="form-control mt-2 mb-3" placeholder="Confirm Password" onChange={formik.handleChange} value={formik.values.password2} />
        {err && <p className="text-danger">Error Occoured. Try Again</p>}
        <button type="submit" className="btn__primary">
        {loading? "Signing Up" : "Signup"}
        </button>
        <Link to="/login" className="mt-2 text-dark">Login</Link>
        </form>
        </div>
        </div>
        </div>
        </section>
    )
}

export default Signup;