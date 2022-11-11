import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Loader = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: '999',
        bgcolor: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: '20px',
      }}
    >
      <CircularProgress color="success" />
      <Typography
        sx={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#013D29',
        }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default Loader;
