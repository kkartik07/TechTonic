import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login'
import Post from './components/Post'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/posts/:postId' element={<Post/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
