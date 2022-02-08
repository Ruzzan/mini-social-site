import React,{useState,useContext} from 'react';
import Navbar from '../Navbar';
import {Link} from 'react-router-dom';
import {loginUser} from './actions'
import {UserContext} from '../../context/UserContext'
import {useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';

const Login = () => {
    const [err,setErr] = useState(false);
    const [loading,setLoading] = useState(false);
    const {login_success} = useContext(UserContext);
    const navigate = useNavigate();
   
    const formik = useFormik({
      initialValues:{
        username:"",password:""
      },
      onSubmit: async (values) => {
        setLoading(true)
        let data = await loginUser(values)
        if(data) {
          login_success(data);
          navigate('/');
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
        <h4 style={{fontFamily:"Ubuntu"}}>Login</h4>
        <input type="text" className="form-control" name="username" placeholder="Username" 
        onChange={formik.handleChange} value={formik.values.username} />
        <input type="password" className="form-control mt-2 mb-3" name="password" placeholder="Password" onChange={formik.handleChange}
        value={formik.values.password} />
        { err && <p className="text-danger"> Invalid Credentials </p> }
        <button type="submit" className="btn__primary">
        {loading ? "Loging In" : "Login" }
        </button>
        <Link to="/signup" className="mt-2 text-dark">Signup</Link>
        </form>
        </div>
        </div>
        </div>
        </section>
    )
}

export default Login;