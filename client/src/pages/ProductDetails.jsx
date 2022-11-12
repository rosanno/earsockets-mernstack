import React, { useState } from 'react';
import { useGetProductQuery } from '../redux/services/productApi';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Ratings from '../components/Ratings';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { useAddToCartMutation } from '../redux/features/cartSlice';
import { useSelector } from 'react-redux';

const ProductDetails = () => {
  const { slug } = useParams();
  const { data, isLoading } = useGetProductQuery(slug);
  const auth = useSelector((state) => state.auth);
  const [index, setIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addToCart, { isLoading: loading }] = useAddToCartMutation();
  const load = true;

  const handleAddToCart = async (color, colorImg) => {
    const res = await addToCart({
      productId: data._id,
      color,
      colorImg,
      quantity,
    });

    if (!auth?.token) {
      toast.error('Plese login', {
        position: 'top-right',
        toastId: 'success',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }

    if (res) {
      toast.success('Successfully added to cart', {
        position: 'top-right',
        toastId: 'success',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="xl" sx={{ marginBottom: '4rem', marginTop: '8rem' }}>
      <Box px="5rem" mt="4rem">
        <Grid container spacing={7}>
          <Grid item lg={6} md={10} sm={10}>
            <Box
              sx={{
                bgcolor: '#F6F6F6',
                width: '100%',
                height: { lg: '480px', sm: '300px' },
                display: 'flex',
                justifyContent: 'center',
                borderRadius: '15px',
                padding: '1rem',
              }}
            >
              <img
                src={data?.img[index]}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }} gap={2} mt={2}>
              {data?.img?.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    bgcolor: '#f6f6f6',
                    padding: '0 .3rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => setIndex(idx)}
                >
                  <img
                    src={item}
                    alt=""
                    style={{
                      width: '60px',
                      height: '60px',
                      padding: '.2rem',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item lg={6} md={10} sm={10}>
            <Box>
              <Typography
                sx={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                }}
              >
                {data?.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: '.8rem',
                  paddingTop: '.9rem',
                }}
              >
                {data?.description.slice(0, 90)}...
              </Typography>
              <Box mt="1rem">
                <Ratings /> <span>(121)</span>
              </Box>
              <Divider
                sx={{
                  padding: '.5rem 0',
                }}
              />
              <Typography
                sx={{
                  fontSize: '1.7rem',
                  fontWeight: 'bold',
                  marginTop: '1rem',
                }}
              >
                ${data?.price}
              </Typography>
              <Divider
                sx={{
                  padding: '.5rem 0',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '1rem',
                  gap: '16px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: '#f6f6f6',
                    width: 'max-content',
                    padding: '.7rem .8rem',
                    borderRadius: '80px',
                    gap: '5px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    disabled={quantity <= 1 && true}
                    component="button"
                    onClick={() => setQuantity((prev) => prev - 1)}
                  >
                    <RemoveIcon color="#013D29" />
                  </Box>
                  <Box
                    component="input"
                    width="80px"
                    value={quantity}
                    readOnly={true}
                    textAlign="center"
                    fontSize="1rem"
                    sx={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      color: '#013D29',
                    }}
                  ></Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    component="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    <AddIcon color="#013D29" />
                  </Box>
                </Box>
                <Box>
                  <Typography fontSize=".8rem" fontWeight="500">
                    Only{' '}
                    <span
                      style={{
                        color: '#F09351',
                      }}
                    >
                      {data?.stock} items
                    </span>{' '}
                    Left!
                    <br /> Don't miss it
                  </Typography>
                </Box>
              </Box>
              <Box
                onClick={() =>
                  handleAddToCart(data?.color[index], data?.img[index])
                }
                sx={{ position: 'relative' }}
              >
                <Button isLoading={loading} fontSize="1rem">
                  Add to Cart
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '54%',
                      left: '14%',
                    }}
                  />
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductDetails;
