import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#0CA90C',
  },
  '& .MuiRating-iconHover': {
    color: '#0CA90C',
  },
  '.MuiRating-decimal': {
    fontSize: '1.2rem',
  },
});

const Ratings = () => {
  return (
    <StyledRating
      precision={0.5}
      readOnly={true}
      defaultValue={3.5}
      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
    />
  );
};

export default Ratings;
