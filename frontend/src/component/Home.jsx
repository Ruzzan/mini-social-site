import React,{useContext} from 'react';
import Navbar from './Navbar';
import Sidebar from './post/Sidebar';
import CreatePost from './post/Create';
import PostList from './post/List';
import {UserContext} from '../context/UserContext'

const Home = () => {
    const {user} = useContext(UserContext);
    let avatar = user.data.user.avatar;

    return(
        <section>
        <Navbar />
        <div className="container" id="main__container">
        <div className="row">
        <div className="col-md-3">
        <Sidebar />
        </div>
        <div className="col-md-6">
        <CreatePost avatar={avatar} />
        <PostList/>
        </div>
        </div>
        </div>
        </section>
    )
}

export default Home;