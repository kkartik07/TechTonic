import React,{useState} from 'react'
import './Login.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';


function Login() {
  const navigate = useNavigate();
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("")
    const [open, setOpen] = React.useState(false);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
  const handleLogin=async()=>{
    const body={
      username,
      password
    }
    try{

      const response=await axios.post('http://localhost:3001/signin',body);
      if(response){
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('_id', response.data._id);
        localStorage.setItem('username',username);
        navigate('/',{replace: true});
      }
      else {
        console.log('Login failed. Incorrect username or password.');
        setSnackbarMessage("Incorrect username or password")
        setOpen(true)
      }
    }catch(err){
      console.log(err)
      setSnackbarMessage("Incorrect username or password")
      setOpen(true)
    }
  }
  return (
    <div>
      <div className="login-background">
        <div className="login-form shadow-lg">
            <div className="login-title mb-2" style={{color:'black'}}>Welcome Back</div>
            <div style={{color:'rgb(50,60,73)',textAlign:'center',marginBottom: 20,fontSize:22
            }}>Enter your credentials to access your account</div>
            <hr/>
            <div>
                <input type="text" placeholder="User Name" className="form-control" onChange={(e)=>setUsername(e.target.value)} />
                <input type="password" placeholder="Password" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button className="login-btn" onClick={handleLogin} style={{backgroundColor:'black',color:'white',border:'none'}}>Login</button>
            <Link to='/signup' className='link' style={{textAlign:'center',marginTop: 20,fontSize:18,color:'darkpurple'
            }}>Don't have a account? <span style={{textDecoration:'underline'}}>Sign Up</span></Link>
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

export default Login
