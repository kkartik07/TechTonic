import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetailsPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [username,setUsername]=useState("Anonymous")

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/posts/${postId}`);
                setPost(response.data);
                let name=await axios.get(`http://localhost:3001/api/user/${response.data.author}`);
                setUsername(name.data)
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };

        fetchPostDetails();
    },[]);

    return (
        <div>
            {post ? (
                    <div>
                      <h2>{post.title}</h2>
                      <div className='group1'>
                        <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
                        <p>Viewed: {post.popularity}</p>
                      </div>
                      <div>Posted By : {username}</div>
                      <button>Comment</button>
                      <hr/>
                      <p>{post.content}</p>
                      <p>Author: {post.author}</p>
                      <p>Upvotes: {post.upvote}</p>
                      <p>Downvotes: {post.downvote}</p>
                
                      {/* You can add logic to display comments if available */}
                      {post.comments.length > 0 && (
                        <div>
                          <h3>Comments:</h3>
                          <ul>
                            {post.comments.map((comment, index) => (
                              <li key={index}>{comment}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default PostDetailsPage;
