import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Post.css";
import { Button } from "@mui/material";
import Comment from "./Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import TrendingUpTwoToneIcon from "@mui/icons-material/TrendingUpTwoTone";
import Loader from "@mui/material/CircularProgress";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import SendIcon from "@mui/icons-material/Send";
import { capitalize } from "@mui/material";
import Create from "./Create";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Follow from './Follow';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Link, useNavigate } from "react-router-dom";

const PostDetailsPage = () => {
  const navigate = useNavigate()
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [username, setUsername] = useState("Anonymous");
  const [comments, setComments] = useState([]);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [currentUser, setCurrentuser] = useState("");
  const [tags, setTags] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [summary, setSummary] = useState("")
  const handleOpen1 = () => setOpen1(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose1 = () => setOpen1(false);
  const handleClose2 = () => setOpen2(false);
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/posts/${postId}`
        );
        if (!response) navigate(`/`, { replace: true })
        if (response) setPost(response.data);

        let name = await axios.get(
          `http://localhost:3001/api/user/${response.data.author}`
        );
        setUsername(capitalize(name.data.username));
        setUpvotes(response.data.upvote);
        setDownvotes(response.data.downvote);
        setTags(response.data.tags);
        let curruser = localStorage.getItem('username');
        if (curruser) {
          setCurrentuser((prev) => curruser);
        }
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
  },[]); // Ensure the effect runs when postId changes
  const handleDelete = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.token}`,
        'Content-Type': 'application/json',
      };
      const response = await axios.delete(`http://localhost:3001/posts/${postId}`, { headers: headers })
      if (response) {
        navigate(`/`, { replace: true })
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleUpvote = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/posts/${postId}/upvote`
      );
      if (response) {
        setUpvotes(upvotes + 1);
      }
    } catch (error) {
      console.error("Error upvoting:", error);
    }
  };
  const handleDownvote = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/posts/${postId}/downvote`
      );
      if (response) {
        setDownvotes(downvotes + 1);
      }
    } catch (error) {
      console.error("Error downvoting:", error);
    }
  };

  const commentInputRef = useRef(null);

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

  const handleSummary = async (e) => {
    e.preventDefault();
    if (post.content) {
      const formdata = new FormData();
      formdata.append("key", "5835caa89022008ea78c405d4e166f79");
      formdata.append("txt", post.content);
      formdata.append("sentences", 5);

      const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://api.meaningcloud.com/summarization-1.0", requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json().then(body => ({ status: response.status, body }));
        })
        .then(result => {
          const data = result.body.summary;
          setSummary(data)
        })
        .catch(error => {
          console.error('Error:', error);
        })
    }
  };

  const handleCopy = async () => {
    let text = summary;
    try {
      await navigator.clipboard.writeText(text);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }

  }


  const handleComment = async (e) => {
    e.preventDefault();
    if (commentInputRef.current.value === "") return;
    const headers = {
      Authorization: `Bearer ${localStorage.token}`,
      'Content-Type': 'application/json',
    };
    try {
      const body = {
        postID: post._id,
        content: commentInputRef.current.value,
      };
      const response = await axios.post(
        `http://localhost:3001/comment`,
        body,
        { headers: headers }
      );
      if (response) {
        commentInputRef.current.value = "";
        // Refetch comments after adding a new comment
        setPost((oldPost) => {
          const newPost = oldPost;
          newPost.comments.push(response.data);
          return newPost;
        })
        fetchComments(post.comments);
        setComments((prevComments) => [...prevComments, response.data]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {post ? (
        <div className="postcontainer">
          <div className="side">
            <div className="sidebar">
              <div className="outbox">
                <div className="bold">Posted By :</div> {username}
                <Follow author={post.author} />
              </div>
              <hr />
              <div className="outbox">
                <TrendingUpTwoToneIcon />
                <div className="bold box">
                  Popularity : <div>{post.popularity}</div>
                </div>
              </div>
              <hr />
              <div className="outbox">
                <ThumbUpIcon onClick={handleUpvote} className="icon" />
                <div className="bold box">
                  Upvotes : <div>{upvotes}</div>
                </div>
              </div>
              <hr />

              <div className="outbox">
                <ThumbDownIcon onClick={handleDownvote} className="icon" />
                <div className="bold box">
                  Downvotes :<div>{downvotes}</div>
                </div>
              </div>
              <hr />

              <div>
                <div className="bold">Posted On :</div>{" "}
                {new Date(post.createdAt).toDateString()}
              </div>
            </div>
            <Create />
          </div>

          <div>
          </div>

          <div className="postbody">
            <div className="group2">
              <div id='head'>
                <h2>{post.title}</h2>
                <div style={{ fontSize: "20px" }}>
                  {tags.length >1 && <div id='tags'>
                    {tags.map(tag => (
                      <div id='tag'>{tag}</div>
                    ))}
                  </div>}
                  {tags.length<=1 && <div id="tag">No tags provided</div>}
                  <span className="bold">Posted By :</span> {username}
                </div>
              </div>
              <div>
                {currentUser === username.toLowerCase() && <><Link to={`/edit/${post._id}`}><Tooltip title="Edit post"><Button variant="contained" className="btn" style={{
                  marginRight: 20, backgroundColor: 'lightgrey', color: 'black'
                }}><EditIcon/></Button></Tooltip></Link>
                <Tooltip title='Delete Post'>
                  <Button variant="contained" className="btn" onClick={handleOpen1} style={{
                    marginRight: 20,backgroundColor: 'lightgrey', color: 'black'
                  }}><DeleteIcon/></Button></Tooltip>
                  <Modal
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box className='deletemodal'>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure you want to delete the post?
                      </Typography>
                      <div style={{ float: 'right' }}>
                        <Button style={{ color: 'red' }} onClick={handleDelete}>Yes</Button>
                        <Button onClick={handleClose1}>Cancel</Button>
                      </div>
                    </Box>
                  </Modal></>}
                <Button
                  variant="contained"
                  className="btn"
                  href="#comment"
                >
                  Comment
                </Button>
                <Tooltip title="Try our new feature! AI-Summary ">
                <Button variant="contained" className="btn" onClick={handleOpen2} style={{
                  marginRight: 20, marginLeft: 20,borderRadius:'5rem',
                  color: 'purple',backgroundColor:'pink'
                }}><AutoAwesomeIcon /></Button>
                </Tooltip>
                <Modal
                  open={open2}
                  onClose={handleClose2}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className='deletemodal'>
                    <Typography id="modal-modal-title summary" variant="h6" component="h2" value={summary} style={{ display: 'flex', justifyContent: 'center' }}>
                      {summary ? summary :
                        <Loader style={{
                          marginBottom: 30, marginTop: 30,
                        }} />
                      }
                    </Typography>
                    <div style={{ float: 'right' }}>
                      {summary && <><span style={{fontSize:20,marginRight: 10,
                      }}>Copy</span><ContentCopyIcon onClick={handleCopy} style={{marginRight:20,marginTop: 10,
                      }}/></>}
                      <Button style={{ color: 'blue' }} onClick={handleSummary}>Generate</Button>
                      <Button onClick={handleClose2} style={{ color: 'red' }}>Cancel</Button>
                    </div>
                  </Box>
                </Modal>
              </div>
            </div>
            <hr />
            <div className="postcontent">{post.content}</div>
            {!comments && <div className="loader">
              <Loader />
            </div>}
            {comments.length > 0 ? (
              <div>
                <div className="commenthead">
                  Comments ({comments.length})
                </div>
                <div>
                  <div id="comment">
                    <BaseTextareaAutosize
                      ref={commentInputRef}
                      className="commentbox"
                      style={{ marginBottom: '20px' }}
                    />
                    <Button
                      variant="contained"
                      endIcon={<SendIcon />}
                      onClick={(e) => handleComment(e)}
                      style={{ marginBottom: '20px' }}
                    >
                      Comment
                    </Button>
                  </div>
                </div>
                <div className="commenthead">
                  {comments.map((comment, index) => (
                    <Comment key={index} comment={comment} />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="commenthead" style={{
                  marginBottom: 20, marginLeft: 10,

                }}>
                  Comments ({comments.length})
                </div>
                <div id="comment" className="commenthead">
                  <BaseTextareaAutosize
                    ref={commentInputRef}
                    className="commentbox"
                  />
                  <Button
                    variant="contained"
                    id="btn2"
                    endIcon={<SendIcon />}
                    onClick={(e) => handleComment(e)}
                    style={{ marginBottom: '20px' }}
                  >
                    Comment
                  </Button>
                </div>
                <div style={{ fontSize: '20px' }}>No comments available, Be the first one to comment!</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="loader">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default PostDetailsPage;
