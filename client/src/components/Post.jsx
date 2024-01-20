import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Post.css";
import { Button } from "@mui/material";
import Comment from "./Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import TrendingUpTwoToneIcon from "@mui/icons-material/TrendingUpTwoTone";
import Loader from '@mui/material/CircularProgress';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import SendIcon from '@mui/icons-material/Send';
import { capitalize } from '@mui/material';

const PostDetailsPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [username, setUsername] = useState("Anonymous");
  const [comments, setComments] = useState([]);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/posts/${postId}`
        );
        setPost(response.data);

        let name = await axios.get(
          `http://localhost:3001/api/user/${response.data.author}`
        );
        setUsername(name.data);
        setUpvotes(response.data.upvote)
        setDownvotes(response.data.downvote)
        // Call fetchComments here, after setting the post
        if (response.data.comments.length > 0) {
          fetchComments(response.data.comments);
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    const fetchComments = async (commentIds) => {
      try {
        let commentsArray = [];

        for (const id of commentIds) {
          const commentResponse = await axios.get(
            `http://localhost:3001/api/comments/${id}`
          );
          commentsArray.push(commentResponse.data);
        }

        setComments(commentsArray);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    // Call the asynchronous function
    fetchPostDetails();
  }, [postId]); // Ensure the effect runs when postId changes
  
  const handleUpvote = async () => {
    try {
        const response = await axios.post(`http://localhost:3001/posts/${postId}/upvote`);
        if (response) {
            setUpvotes(upvotes + 1);
        }
    } catch (error) {
        console.error('Error upvoting:', error);
    }

};
  const handleDownvote = async () => {
    try {
        const response = await axios.post(`http://localhost:3001/posts/${postId}/downvote`);
        if (response) {
            setDownvotes(downvotes + 1);
        }
    } catch (error) {
        console.error('Error downvoting:', error);
    }
};

  const handleComment=async (e)=>{
    console.log('sdsd')
    e.preventDefault();
    try{
      const body={
        'postID':post._id,
        'content':e.target.value
      }
      const response=await axios.post(`http://localhost:3001/comment`,body);
      if(response.data.success)e.traget.value=""
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div>
      {post && comments ? (
        <div className="postcontainer">
          
          <div className="sidebar">
            <div className="outbox">
              <div className="bold">Posted By :</div> {capitalize(username)}
            </div>
            <hr/>
            <div className="outbox">
              <TrendingUpTwoToneIcon/>
              <div className="bold box">Popularity : <div>{post.popularity}</div></div>
              
            </div>
            <hr/>
            <div className="outbox">
                <ThumbUpIcon onClick={handleUpvote} className='icon'/>
                <div className="bold box" >Upvotes : <div>{upvotes}</div></div>
            </div>
            <hr/>

            <div className="outbox">
              <ThumbDownIcon onClick={handleDownvote} className='icon'/>
              <div className="bold box">Downvotes :<div>{downvotes}</div></div> 
            </div>
            <hr/>

            <p>
              <div className="bold">Posted On :</div>{" "}
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
          
          <div className="postbody">
            <div className="group2">
              <div>
                <h2>{post.title}</h2>
                <div style={{ fontSize: "20px" }}>
                  <span className="bold">Posted By :</span> {username}
                </div>
              </div>
            <Button variant="contained" className="btn" href="#comment">Comment</Button>
            </div>
            <hr />
            <div className="postcontent">{post.content}</div>
            {comments.length > 0 ? (
              <div>
                <div className="commenthead">Comments ({comments.length})</div>
                <div>
                <div id="comment"><BaseTextareaAutosize className="commentbox"/><Button variant="contained" endIcon={<SendIcon/> } onClick={(e)=>handleComment(e)}>Comment</Button></div>
                </div>
                <div>
                  {comments.map((comment, index) => (
                    <Comment key={index} comment={comment}/>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="commenthead">Comments ({comments.length})</div>
                <div id="comment"><BaseTextareaAutosize className="commentbox"/><Button variant="contained" id='btn2' endIcon={<SendIcon/>} onClick={(e)=>handleComment(e)}>Comment</Button></div>
                No comments available, Be the first one to comment!</div>
            )}
          </div>
        </div>
      ) : (
        <div className="loader"><Loader /></div>
      )}
    </div>
  );
};

export default PostDetailsPage;
