import React,{useEffect,useContext} from 'react';
import Navbar from '../Navbar';
import {Link} from 'react-router-dom';
import {UserContext} from '../../context/UserContext'

const Logout = ()=> {
    const {logout} = useContext(UserContext);
    useEffect(()=>{
        logout();
    },[])
    return (
        <section>
        <Navbar/>
        <div className="container" id="main__container">
        <div className="row">
        <div className="col-md-4 mx-auto" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:'center'}}>
        <h4 style={{fontFamily:"Roboto",textAlign:"center"}}>
        You have been Logged Out.
        </h4>
        <Link to="/login" className="btn__primary">Login</Link>
        </div>
        </div>
        </div>
        </section>
    )
}

export default Logout;