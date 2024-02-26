import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

import axios from 'axios';

function Follow({ author }) {

    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [open, setOpen] = React.useState(false);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    async function handleFollow(e) {
        e.preventDefault();
        const id = localStorage.getItem('_id');

        if (id === author) {
            setSnackbarMessage('Can\'t subscribe yourself')
            setOpen(true)
            return;
        }

        try {
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.patch(`https://techtonic-1.onrender.com/subscribe/${author}`, {}, { headers: headers });

            if (!response) {
                setSnackbarMessage('Failed to subscribe');
                setOpen(true);
            } else {
                setSnackbarMessage('Subscribed successfully');
                setOpen(true);


            }

        } catch (err) {
            setSnackbarMessage(err.response.data)
            setOpen(true);
            console.log(err);
        }
    }

    return (
        <div>
            <Button size="small" variant='contained' onClick={handleFollow}>Follow</Button>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={snackbarMessage}
                sx={{ position: "absolute" }}
            />
        </div>
    );
}

export default Follow;
