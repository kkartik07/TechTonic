import React from 'react'
import './UserProfile.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Link } from 'react-router-dom';
import TrendingUpTwoToneIcon from '@mui/icons-material/TrendingUpTwoTone';

const truncateContent = (content, maxWords) => {
    const words = content.split(' ');
    if (words.length <= maxWords) {
      return content;
    }
    const truncatedContent = words.slice(0, maxWords).join(' ');
    return `${truncatedContent}...`;
  };

  
function PostPreview({post}) {
  return (
    <div className='preview'>
      <div id='head'>
      <div>{truncateContent(post.title,7)}</div>
      </div>
      <Link to={`/posts/${post._id}`} className='link'>
    <div id='view'>
        View Post &rarr; 
        </div></Link>
      <div className='counts' id='counts'>
          <div className='box'><TrendingUpTwoToneIcon />Popularity: {post.popularity}</div>
          <div className='box'><ThumbUpIcon className='icon' />Upvotes: {post.upvote} </div>
          <div className='box'><ThumbDownIcon className='icon' />Downvotes: {post.downvote}</div>
        </div>
    </div>
  )
}

export default PostPreview
