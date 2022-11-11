import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import Hero from '../components/Hero';
import Loader from '../components/Loader';
import Product from '../components/Product';
import { useGetProductsQuery } from '../redux/services/productApi';

const Home = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="xl" sx={{ marginBottom: '4rem', marginTop: '4rem' }}>
      <Box
        px={{
          lg: '5rem',
          xs: '1rem',
        }}
      >
        <Hero />
      </Box>
      <Box px="5rem" py="2rem">
        <Typography
          variant="h6"
          sx={{
            fontWeight: '600',
            textTransform: 'capitalize',
            padding: '2rem 0',
          }}
        >
          Earbuds for you!
        </Typography>

        <Box
          gap={4}
          sx={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fill, minmax(280px, 1fr))!important',
          }}
        >
          {data?.products.slice(0, 5).map((product) => (
            <Box key={product._id}>
              <Product {...product} />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
