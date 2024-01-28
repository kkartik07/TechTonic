import React, { useState, useEffect } from 'react'
import './UserProfile.css'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ForumIcon from '@mui/icons-material/Forum';
import axios from 'axios';
import PostPreview from './PostPreview';
import { capitalize } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
function UserProfile() {
  const id = localStorage.getItem('_id')
  const username = localStorage.getItem('username')
  const [posts, setPosts] = useState([]);
  const [details, setDetails] = useState({});
  const [isAscending, setIsAscending] = useState(false);

  const handleSort = () => {
    const newPosts = [...posts];
    newPosts.sort((a, b) => {
      if (isAscending) return a.popularity - b.popularity;
      else return b.popularity - a.popularity;
    });
    setPosts(newPosts);
    setIsAscending(!isAscending);
  };


  useEffect(() => {
    const getPosts = async () => {
      const headers = {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
      };
      const response = await axios.get(`http://localhost:3001/profile/${id}`, { headers: headers });
      if (!response) return;
      console.log(response.data.posts)
      setPosts(response.data.posts);
      setDetails(response.data.details);
    };
    getPosts();
  }, []);

  return (
    <div>
      <div id='details'>
        <h2 id='h2'>User Analytics</h2>
        <div id='g5'>
          <img src='/images/avatar.png' alt='logo' width={100} />
          <div>
            <div style={{
              marginLeft: 20,

            }}>Username: {capitalize(username)}</div>
          </div>
          <div id='follow'>
            <div><SubscriptionsIcon style={{
              marginRight: 10,
            }} /><span id='fc'>{details.subscribers}</span> Followers</div>
            <div> <SubscriptionsIcon style={{
              marginRight: 10,
            }} /><span id='fc'>{details.subscribedTo}</span> Followed</div>
          </div>
        </div>
        <div id='bigbox'>

          <div className='box3'>
            <div id='attr'>Total Views</div>
            <RemoveRedEyeIcon fontSize='large' id='icons' />
            <div id='value'>{details.totalViews}</div>
          </div>
          <div className='box3'>
            <div id='attr'>Total Upvotes</div>
            <ThumbUpIcon fontSize='large' id='icons' />
            <div id='value'>{details.totalUpvotes}</div>
          </div>
          <div className='box3'>
            <div id='attr'>Total Downvotes</div>
            <ThumbDownIcon fontSize='large' id='icons' />
            <div id='value'>{details.totalDownvotes}</div>
          </div>
          <div className='box3'>
            <div id='attr'>Total Comments</div>
            <ForumIcon fontSize='large' id='icons' />
            <div id='value'>{details.totalComments}</div>
          </div>
        </div>
      </div>
      <br></br>
      <hr />
      <h2 id='h2'>User's Posts
        <SwapVertIcon style={{
          float: 'right', marginRight: 50,

        }} onClick={handleSort} fontSize='larger' />
      </h2>
      <div id='box4'>
        {posts.map((post) => {
          return (
            <PostPreview key={post._id} post={post} />
          )
        })}
      </div>
    </div>
  )
}

export default UserProfile
