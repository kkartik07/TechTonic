import React from 'react'
import './Login.css'
function Login() {

  return (
    <div>
      <div className="login-background">
        <div className="login-form shadow-lg">
            <div className="login-title mb-2">Welcome Back</div>
            <hr/>
            <div>
                <input type="text" placeholder="User Name" className="form-control" />
                <input type="password" placeholder="Password" className="form-control" />
            </div>
            <button className="login-btn">Login</button>
        </div>
    </div>
    </div>
  )
}

export default Login
