import React,{useState} from 'react'
import './Login.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';


function Signup() {
  const navigate = useNavigate();
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");

  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [open, setOpen] = React.useState(false);


  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }

      setOpen(false);
  };

  const handleSignup=async()=>{
    if(username.length<6){
      setSnackbarMessage("Username must be greater than 6 characters");
      setOpen(true)
      return;
    }
    if(password.length<6){
      setSnackbarMessage("Password must be greater than 6 characters");
      setOpen(true)
      return;
    }
    if(!email.includes('@')){
      setSnackbarMessage("Invalid E-mail id ! Please try again");
      setOpen(true);
      return;
    }
    const body={
      username,
      password,
      email
    }
    const response=await axios.post('http://localhost:3001/signup',body);
    if(response){
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('_id', response.data._id);
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
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={snackbarMessage}
                sx={{ position: "absolute" }}
            />
    </div>
    </div>
  )
}

export default Signup;
