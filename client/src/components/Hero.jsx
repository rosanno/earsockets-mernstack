import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';
import imgUrl from '../assets/model.webp';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#FCF0E4',
        borderRadius: '10px',
        padding: {
          lg: '0 4.6rem',
          xs: '2rem 4.6rem',
        },
        marginTop: '6rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: {
              lg: '2.3rem',
              xs: '1.5rem',
            },
            fontWeight: 'bold',
            lineHeight: '0.9',
            color: '#063F2A',
          }}
        >
          Grab Up to 50% off On
        </Typography>
        <Typography
          sx={{
            fontSize: {
              lg: '2.3rem',
              xs: '1.5rem',
            },
            fontWeight: 'bold',
            color: '#063F2A',
          }}
        >
          Selected Headphone
        </Typography>
        <Link to="/shop">
          <Box
            component="button"
            sx={{
              alignSelf: 'start',
              background: '#063F2A',
              color: '#fff',
              marginTop: '14px',
              padding: '.6rem 1.4rem',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',

              '&:hover': {
                background: '#013D29',
              },
            }}
          >
            Shop Now
          </Box>
        </Link>
      </Box>
      <Box
        sx={{
          width: '320px',
          height: '320px',
          paddingTop: '1.2rem',
          display: {
            lg: 'block',
            md: 'block',
            xs: 'none',
          },
        }}
      >
        <img
          src={imgUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
    </Box>
  );
};

export default Hero;
