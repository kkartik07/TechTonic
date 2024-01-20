import React, { useEffect,useState } from 'react'
import './PostCard.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
import {Link} from 'react-router-dom'
import axios from 'axios'
import { capitalize } from '@mui/material';


const truncateContent = (content, maxWords) => {
  const words = content.split(' ');
  if (words.length <= maxWords) {
    return content;
  }
  const truncatedContent = words.slice(0, maxWords).join(' ');
  return `${truncatedContent}...`;
};


function PostCard({post}) {
  const truncatedContent = truncateContent(post.content, 40);
  const [username, setUsername] = useState("Anonymous");
  const [upvotes, setUpvotes] = useState(post?post.upvote:0);
  const [downvotes, setDownvotes] = useState(post?post.downvote:0);
  useEffect(()=>{
    async function getUsername(){
        try{
          let name=await axios.get(`http://localhost:3001/api/user/${post.author}`);
          if(name)setUsername(capitalize(name.data))
        }catch(err){
          console.log(err)
        }
      } 
      getUsername();
      setUpvotes(post.upvote)
      setDownvotes(post.downvote)
    },[])
    
    const handleUpvote = async () => {
      try {
          const response = await axios.post(`http://localhost:3001/posts/${post._id}/upvote`);
          if (response) {
              setUpvotes(upvotes + 1);
          }
      } catch (error) {
          console.error('Error upvoting:', error);
      }
    
    };
    const handleDownvote = async () => {
      try {
          const response = await axios.post(`http://localhost:3001/posts/${post._id}/downvote`);
          if (response) {
              setDownvotes(downvotes + 1);
          }
      } catch (error) {
          console.error('Error downvoting:', error);
      }
  };
  return (
    <div className='post'>
        <div className='body'>

        <p>{username?username:"Anonymous"}</p>
      <div><b>{post.title}</b></div>
      <div className='content'>{truncatedContent}</div>
      <Link to={`/posts/${post._id}`}>View Post</Link>
        </div>
      <div>
        <hr/>
        <div className='counts'>
            <div className='box'><TrendingUpTwoToneIcon />Popularity: {post.popularity}</div>
            <div className='box'><ThumbUpIcon onClick={handleUpvote} className='icon'/>Upvotes: {upvotes} </div>
            <div className='box'><ThumbDownIcon onClick={handleDownvote} className='icon'/>Downvotes: {downvotes}</div>
        </div>
      </div>
    </div>
  )
}
export default PostCard;