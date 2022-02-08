import './App.css';
import {Route,Routes} from 'react-router-dom';
import Home from './component/Home';
import PostDetail from './component/post/Detail';
import Page404 from './component/Page404';
import Profile from './component/user/Profile';
import UserDetail from './component/user/UserDetail';
import Signup from './component/auth/Signup';
import Login from './component/auth/Login';
import Logout from './component/auth/Logout';
import Search from './component/post/Search';
import EditPost from './component/post/Edit';
import ProtectedRoute from './component/Route';
import {UserProvider} from './context/UserContext'

function App() {
  return (
    <UserProvider>
    <Routes>
    {/* PROTECTED ROUTES  */}
    <Route element={<ProtectedRoute/>}>
    <Route path="/" element={<Home />} />
    <Route path="post/:postId" element={<PostDetail />} />
    <Route path="post/edit/:postId" element={<EditPost />} />
    <Route path="profile/" element={<Profile/>} />
    {/* search route with optional parameter  */}
    <Route path="search/" element={<Search/>}> 
      <Route path=":query" element={<Search/>}/>
    </Route>
    {/* search route with optional parameter  */}
    <Route path="user/:userId" element={<UserDetail/>} />
    </Route>
    {/* END PROTECTED ROUTES  */}
    <Route path="signup/" element={<Signup/>} />
    <Route path="login/" element={<Login/>} />
    <Route path="logout/" element={<Logout/>} />
    <Route path="*" element={<Page404/>} />
    </Routes>
    </UserProvider>
  );
}

export default App;
