import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PostCard from './PostCard';
import './Home.css'
import Carousal from './Carousal';
import TrendingUpTwoTone from '@mui/icons-material/TrendingUpTwoTone';
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
    <div >
      <div className='headdrop'><span id='g4'>Your </span> Ideas, <span id='g4'>Your</span> Voice, <span id='g4'>Our</span> Platform.</div>
       
       {posts.length > 5 && <><div style={{overflowX:'hidden'}}><h2 style={{fontWeight:100,float:'right',marginRight: 30,marginBottom:50
        }}>Trending Now<span> <TrendingUpTwoTone style={{fontSize:45}}/></span></h2>
        <Carousal/></div></>}
      <div className='container'>
        {posts.map((post)=>{
          return (
            <PostCard key={post._id} post={post}/>
            )
          })}
          </div>
    </div>
  )
}

export default Home
