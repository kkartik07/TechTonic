import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import './Carousal.css'

const Carousal = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(`https://techtonic-1.onrender.com/posts`);
        if (!response) return;

        const newPosts = response.data.sort((a, b) => b.popularity - a.popularity);
        const tPosts = newPosts.slice(0, 10);
        setPosts(tPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="c">
      <div className='card-home'>
      {posts.map((post) => (
      <PostCard post={post} key={post._id} className='pc'/>
      ))}
      </div>
    </div>
  );
};

export default Carousal;
