import React, { useEffect,useState } from 'react'
import './Comment.css'
import { capitalize } from '@mui/material';
import axios from 'axios'


function getDate(cdate){
    let date=new Date(cdate);
    return (date.getDate().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getUTCFullYear().toString());
}
function Comment({comment}) {
  const [username,setUsername]=useState("Anonymous")
  useEffect(()=>{
    async function getUser() {
      try {
        let user = await axios.get(`http://localhost:3001/api/user/${comment.author}`);
        if (user) setUsername(capitalize(user.data.username))
      } catch (err) {
        console.log(err)
      }
    }
    getUser();
  })
  return (
    <div className='comment'>
        <div className='details'>
            <span id='g3'>{username}</span>&bull;<span id='g3' style={{color:"#615f5f"}}>{getDate(comment.createdAt)}</span>
        </div>
        <div id='comment'>
          {comment.content}
        </div>
    </div>
  )
}

export default Comment;
