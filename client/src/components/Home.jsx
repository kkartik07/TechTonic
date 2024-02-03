import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PostCard from './PostCard';
import PostPreview from './PostPreview';
import './Home.css'
import Carousal from './Carousal';
import TrendingUpTwoTone from '@mui/icons-material/TrendingUpTwoTone';
import SearchIcon from '@mui/icons-material/Search';

const BASE_URL = 'http://localhost:3001';

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])
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

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
  
    if (value.length === 0) {
      setFiltered([]);
    } else {
      const filteredPosts = posts.filter(post => {
        let tagsString="";
        for(let i=0;i<post.tags.length;i++)tagsString+=post.tags[i].value;
        tagsString=tagsString.toLowerCase()
        return tagsString.includes(value)
      });
      setFiltered(filteredPosts);
    }
  };
  

  return (
    <div >
      <div className='headdrop'><span id='g4'>Your </span> Ideas, <span id='g4'>Your</span> Voice, <span id='g4'>Our</span> Platform.</div>


      <div className='search-group'>
        <div className='search'>
          <input placeholder='Search by tags' id='search' value={search} onChange={(e) => handleSearch(e)} />
          <button id='btn' onClick={handleSearch}><SearchIcon id='icon' /></button>
        </div>
        {filtered.length > 0 && <div id='container'>
          {filtered.map((post) => {
            return (
              <PostPreview post={post} key={post._id} />
              )
          })}
        </div>}
      </div>
              {posts.length > 5 && <><div style={{ overflowX: 'hidden' }}><h2 style={{
                fontWeight: 100, float: 'right', marginRight: 30
              }}>Trending Now<span> <TrendingUpTwoTone style={{ fontSize: 40 }} /></span></h2>
                <Carousal /></div></>}
      <div className='container'>
        {posts.map((post) => {
          return (
            <PostCard key={post._id} post={post} />
          )
        })}
      </div>
    </div>
  )
}

export default Home
