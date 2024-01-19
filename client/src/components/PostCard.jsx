import React, { useEffect,useState } from 'react'
import './PostCard.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
import {Link} from 'react-router-dom'
import axios from 'axios'

function PostCard({post}) {
  const [username, setUsername] = useState("Anonymous");
  useEffect(()=>{
      async function getUsername(){
        try{
          let name=await axios.get(`http://localhost:3001/api/user/${post.author}`);
          if(name)setUsername(name.data)
        }catch(err){
          console.log(err)
        }
      } 
    getUsername();
  },[])
  return (
    <div className='post'>
        <div className='body'>

        <p>{username?username:"Anonymous"}</p>
      <div><b>{post.title}</b></div>
      <div className='content'>{post.content}</div>
      <Link to={`/posts/${post._id}`}>View Post</Link>
        </div>
      <div>
        <hr/>
        <div className='counts'>
            <div className='box'><TrendingUpTwoToneIcon/>Popularity: {post.popularity}</div>
            <div className='box'><ThumbUpIcon/>Upvotes: {post.upvote} </div>
            <div className='box'><ThumbDownAltIcon/>Downvotes: {post.downvote}</div>
        </div>
      </div>
    </div>
  )
}

export default PostCard;