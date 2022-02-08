import {Outlet} from 'react-router-dom';
import Login from '.././component/auth/Login';
import {useContext} from 'react';
import {UserContext} from '../context/UserContext'

// protected route

const ProtectedRoute = () => {
    let {user} = useContext(UserContext); // authenticated user

    // if the user null redirect to login
    if(user.data!==null) {
        return <Outlet/>
    } else {
        return  <Login/>
    }
}

export default ProtectedRoute;