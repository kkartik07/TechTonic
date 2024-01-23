import React from 'react'
import './Comment.css'

function getDate(cdate){
    let date=new Date(cdate);
    return (date.getDate().toString()+"-"+(date.getMonth()+1).toString()+"-"+date.getUTCFullYear().toString());
}
function Comment({comment}) {
  return (
    <div className='comment'>
        <div className='details'>
            <span id='g3'>{comment.author}</span>&bull;<span id='g3' style={{color:"#615f5f"}}>{getDate(comment.createdAt)}</span>
        </div>
        <div id='comment'>
          {comment.content}
        </div>
    </div>
  )
}

export default Comment;
