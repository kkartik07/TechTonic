import React from 'react'
import './Notfound.css'
import {useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
function NotFound() {
  const navigate=useNavigate()
  return (
    <div>
      <div className="flex-container">
  <div className="text-center">
    <h1>
      <span className="fade-in" id="digit1">4</span>
      <span className="fade-in" id="digit2">0</span>
      <span className="fade-in" id="digit3">4</span>
    </h1>
    <h3 className="fadeIn">PAGE NOT FOUND</h3>
    <Button variant='contained' onClick={()=>navigate('/',{replace:true})}>Return To Home</Button>
  </div>
</div>
    </div>
  )
}

export default NotFound
