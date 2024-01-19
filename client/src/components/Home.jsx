import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PostCard from './PostCard';
import './Home.css'
// require('dotenv').config();

const BASE_URL='http://localhost:3001';

function Home() {
    const [posts,setPosts]=useState([]);
    
    const fetchPosts = async (url) => {
        try {
            const response = await axios.get(url);
            return response.data; // Assuming your posts are in the 'data' property of the response
        } catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
    };
    useEffect(() => {
        const getPosts = async () => {
            const fetchedPosts = await fetchPosts(`${BASE_URL}/posts`);
            setPosts(fetchedPosts);
        };
        getPosts();
    }, []);


  return (
    <div className='container'>
      {posts.map((post)=>{
        return (
            <PostCard key={post._id} post={post}/>
        )
      })}
    </div>
  )
}

export default Home
