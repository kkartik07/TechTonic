import React, { useEffect, useState } from 'react'
import './PostCard.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { capitalize } from '@mui/material';
import Follow from './Follow';


const truncateContent = (content, maxWords) => {
  const words = content.split(' ');
  if (words.length <= maxWords) {
    return content;
  }
  const truncatedContent = words.slice(0, maxWords).join(' ');
  return `${truncatedContent}...`;
};


function PostCard({ post }) {
  const truncatedContent = truncateContent(post.content, 20);
  const [username, setUsername] = useState("Anonymous");
  const [upvotes, setUpvotes] = useState(post ? post.upvote : 0);
  const [downvotes, setDownvotes] = useState(post ? post.downvote : 0);
  useEffect(() => {
    async function getUser() {
      try {
        let user = await axios.get(`https://techtonic-2.onrender.com/api/user/${post.author}`);
        if (user) setUsername(capitalize(user.data.username))
      } catch (err) {
        console.log(err)
      }
    }
    getUser();
    setUpvotes(post.upvote)
    setDownvotes(post.downvote)
  }, [post])

  const handleUpvote = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
      };
      const response = await axios.post(`https://techtonic-2.onrender.com/posts/${post._id}/upvote`, {}, { headers: headers });
      if (response) {
        console.log('sdsd')
        setUpvotes(upvotes + 1);
      }
    } catch (error) {
      console.error('Error upvoting:', error);
    }

  };
  const handleDownvote = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
      };
      const response = await axios.post(`https://techtonic-2.onrender.com/posts/${post._id}/downvote`, {}, { headers: headers });
      if (response) {
        setDownvotes(downvotes + 1);
      }
    } catch (error) {
      console.error('Error downvoting:', error);
    }
  };
  return (
    <>
      <Link to={`/posts/${post._id}`} className='link'>
        <div className='post'>
          <div id='card'>
            <div><div style={{ display: 'flex', alignItems: 'center', float: 'right', fontWeight: 600 }}><span style={{
              marginRight: 12, fontSize: 20
            }}>{username ? username : "Anonymous"}</span> <Follow author={post.author} /></div>
              <div><b>{post.title}</b></div>
              <div className='content'>{truncatedContent}</div>
            </div>
            <div id='viewpost'>
              View Post &rarr;
            </div>
          </div>
          <div>
            <hr />
            <div className='counts'>
              <div className='box'><TrendingUpTwoToneIcon />Popularity: {post.popularity}</div>
              <div className='box'><ThumbUpIcon onClick={handleUpvote} className='icon' />Upvotes: {upvotes} </div>
              <div className='box'><ThumbDownIcon onClick={handleDownvote} className='icon' />Downvotes: {downvotes}</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
export default PostCard;