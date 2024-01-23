import React,{useState} from 'react'
import './Login.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");

  const handleSignup=async()=>{
    const body={
      username,
      password,
      email
    }

    const response=await axios.post('http://localhost:3001/signup',body);
    if(response){
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username',username);
      navigate('/',{replace: true});
    }
    else {
      console.log('Signup failed. Incorrect username or password.');
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
                <input type="text" placeholder="Email" className="form-control" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button className="login-btn" onClick={handleSignup}>Signup</button>
        </div>
    </div>
    </div>
  )
}

export default Signup;
