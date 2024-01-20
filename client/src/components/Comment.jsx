import React,{useState,useEffect} from 'react'
import './Comment.css'
import axios from 'axios';
import { capitalize } from '@mui/material';

function getDate(cdate){
    let date=new Date(cdate);
    return (date.getDate().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getUTCFullYear().toString());
}
function Comment({comment}) {
    const [username, setUsername] = useState("Anonymous");
  useEffect(()=>{
      async function getUsername(){
        try{
          let name=await axios.get(`http://localhost:3001/api/user/${comment.author}`);
          if(name)setUsername(capitalize(name.data))
        }catch(err){
          console.log(err)
        }
      } 
    getUsername();
  },[])
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
