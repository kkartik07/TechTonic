import React from 'react'
import Snackbar from '@mui/material/Snackbar';
function SnackBar() {
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
      const { vertical, horizontal, open } = state;
    
      const handleClick = (newState) => () => {
        setState({ ...newState, open: true });
      };
    
      const handleClose = () => {
        setState({ ...state, open: false });
      };
     
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      />
    </div>
  )
}

export default SnackBar
