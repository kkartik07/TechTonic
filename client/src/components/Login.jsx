import React,{useState} from 'react'
import './Login.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");

  const handleLogin=async()=>{
    const body={
      username,
      password
    }

    const response=await axios.post('http://localhost:3001/signin',body);
    if(response){
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('_id', response.data._id);
      localStorage.setItem('username',username);
      navigate('/',{replace: true});
    }
    else {
      console.log('Login failed. Incorrect username or password.');
    }
  }
  return (
    <div>
      <div className="login-background">
        <div className="login-form shadow-lg">
            <div className="login-title mb-2">Welcome Back</div>
            <hr/>
            <div>
                <input type="text" placeholder="User Name" className="form-control" onChange={(e)=>setUsername(e.target.value)} />
                <input type="password" placeholder="Password" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button className="login-btn" onClick={handleLogin}>Login</button>
            <Link to='/signup' className='link' style={{textAlign:'center',marginTop: 20,fontSize:18,color:'darkpurple'
            }}>New User? Register</Link>
        </div>
    </div>
    </div>
  )
}

export default Login
