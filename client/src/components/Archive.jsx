import React, { useEffect, useState } from 'react'
import axios from 'axios' 
import PostCard from './PostCard';
import PostPreview from './PostPreview';

function Archive() {
    const [ids,setIds]=useState([]);
    const [posts,setPosts]=useState([]);
    useEffect(() => {
        async function getPosts() {
          try {
            const id = localStorage.getItem('_id');
            const userResponse = await axios.get(`http://localhost:3001/api/user/${id}`);
            const user = userResponse.data;
            setIds((prev) => user.archives);
    
            if (user.archives.length === 0) return;
    
            const allPostsResponse = await axios.get('http://localhost:3001/posts');
            const allPosts = allPostsResponse.data;
            const filteredPosts = allPosts.filter((post) => user.archives.includes(post._id));
            setPosts(() => filteredPosts);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    
        getPosts();
      }, []);
  return (
    <div><br></br>
    <h2 style={{marginLeft: 30,marginTop: 20,
    }}>Your Archived Posts</h2>
    <br></br>
    <br></br>
    <div id='box4'>
    {posts.map((post)=>{
        return (
          <PostPreview key={post._id} post={post}/>
          )
        })}
    </div>
    </div>
  )
}

export default Archive
