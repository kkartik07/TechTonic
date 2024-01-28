import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login'
import Post from './components/Post'
import NewPost from './components/NewPost'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Signup from './components/Signup';
import EditPost from './components/EditPost';
import UserProfile from './components/UserProfile';
import Trending from './components/Trending';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<><Navbar/><Home/></>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/posts/:postId' element={<><Navbar/><Post/></>}/>
          <Route path='/post' element={<><Navbar/><NewPost/></>}/>
          <Route path='/edit/:id' element={<><Navbar/><EditPost/></>}/>
          <Route path='/trending' element={<><Navbar/><Trending/></>}/>
          <Route path='/profile' element={<><Navbar/><UserProfile/></>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
