import React from 'react'
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button'

function Create() {
  return (
    <div>
      <Link to='/post'>
         <Button variant='contained' style={{width:200}}>create post</Button>
      </Link>
    </div>
  )
}

export default Create
