import React from 'react';
import CustomButton from '@mui/material/Button';

const Button = ({ children, fontSize, isLoading }) => {
  return (
    <CustomButton
      variant="contained"
      disabled={isLoading ? true : false}
      sx={{
        background: 'none',
        borderRadius: '50px',
        padding: '.6rem 3rem',
        fontSize: fontSize,
        cursor: 'pointer',
        fontWeight: 'bold',
        color: '#fff',
        background: '#06661E',
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
    </CustomButton>
  );
};

export default Button;
