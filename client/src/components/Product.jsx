import React from 'react';
import { Box, Typography } from '@mui/material';
import Ratings from './Ratings';
import { Link } from 'react-router-dom';

const Product = (product) => {
  return (
    <>
      <Link
        to={`/product/details/${product.slug}`}
        style={{
          textDecoration: 'none',
          color: 'black',
          display: 'block',
          width: 'max-content',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '290px',
            height: '270px',
            alignItems: 'center',
            bgcolor: '#F6F6F6',
            borderRadius: '10px',
          }}
        >
          <img
            src={product.img}
            style={{
              width: '100%',
              height: '100%',
              padding: '50px',
              objectFit: 'contain',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '.4rem',
          }}
        >
          <Typography fontSize=".8rem" fontWeight="bold">
            {product.title}
          </Typography>
          <Typography fontWeight="500">${product.price}</Typography>
        </Box>
      </Link>
      <Box sx={{ display: 'flex', flexDirection: 'column' }} gap="1.2rem">
        <Ratings />
      </Box>
    </>
  );
};

export default Product;
