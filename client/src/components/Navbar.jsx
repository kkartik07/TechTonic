import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './Navbar.css';
import { capitalize } from '@mui/material';
import { Link } from 'react-router-dom';
import Create from './Create';
import LogoutIcon from '@mui/icons-material/Logout';

export default function ElevateAppBar() {
  const [username, setUsername] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');
  };

  useEffect(() => {
    let name = localStorage.getItem('username');
    console.log('sssssssssssss')
    if (name) {
      setUsername(capitalize(name));
    }
  }, []);

  return (
    <React.Fragment>
      <AppBar className='nav'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to='/' className='link'>
              <img src="/images/icon.png" width={'30px'} alt='logo' />
              <b>Bloggify</b>
            </Link>
          </Typography>
          {!username && (
            <Link to='/login' className='link'>
              <Button color="inherit">Login</Button>
            </Link>
          )}
          {username &&
            <li className="user-info">
              <div><Create /></div>
              <img src="/images/avatar.gif" width="32px" alt="avatar" className="avatar" />
              <div className="user-details">
                <div className="username">{username}</div>
              </div>
              <div className="logout" onClick={handleLogout}>
                <span style={{
                  marginBottom: 20,
                }}>Logout</span>
              </div>
              <LogoutIcon style={{ marginTop: 3, color: '#F14346', marginLeft: 8 }}
                onClick={handleLogout} />
            </li>}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
