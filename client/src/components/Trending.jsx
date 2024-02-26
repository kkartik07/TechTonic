import React,{useState,useEffect} from 'react'
import PostPreview from './PostPreview';
import axios from 'axios'

function Trending() {
  const [posts,setPosts]=useState([]);
  useEffect(() => {
    const getPosts = async () => {
        const response = await axios.get(`https://techtonic-1.onrender.com/posts`);
        if(!response)return;
        const newPosts=response.data.sort((a,b)=>{
            return b.popularity-a.popularity;
        })
        const tPosts=newPosts.slice(0,10);
        setPosts(tPosts);
    };
    getPosts();
}, []);

  return (
    <div>
      <br></br>
      <h2 style={{marginLeft: 30,
      }}>Top 10 trending posts</h2>
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

export default Trending