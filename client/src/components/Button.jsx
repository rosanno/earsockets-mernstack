import React from 'react';
import Box from '@mui/material/Box';

const Button = ({ children, fontSize }) => {
  return (
    <Box
      component="button"
      sx={{
        background: 'none',
        border: '2px solid #013D29',
        borderRadius: '50px',
        padding: '.8rem 3rem',
        fontSize: fontSize,
        cursor: 'pointer',
        fontWeight: 'bold',
        color: '#013D29',
        marginTop: '2rem',
        '&:hover': {
          background: '#013D29',
          transition: 'ease-in-out',
          transitionDuration: '300ms',
          color: '#fff',
        },
      }}
    >
      {children}
    </Box>
  );
};

export default Button;
