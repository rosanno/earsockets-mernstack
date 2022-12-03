import React, { useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useClearCartMutation } from '../redux/features/cartSlice';
import { useSelector } from 'react-redux';
import { usePostOrderMutation } from '../redux/features/orderApiSlice';
import Loader from '../components/Loader';

const Success = () => {
  const effectRun = useRef(false);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [clearCart] = useClearCartMutation();
  const [postOrder, { isLoading }] = usePostOrderMutation();

  useEffect(() => {
    if (!auth.token) return navigate('/');
  }, []);

  useEffect(() => {
    if (effectRun.current === false) {
      const order = async () => {
        try {
          const res = await postOrder();
          if (res) {
            await clearCart();
          }
        } catch (error) {
          console.log(error);
        }
      };

      order();

      return () => (effectRun.current = true);
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="xl">
      <Box
        px="5rem"
        py="2rem"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '540px',
        }}
      >
        <CheckCircleIcon
          sx={{
            fontSize: '3rem',
            color: '#0CA90C',
          }}
        />
        <Box textAlign="center" mt="20px">
          <Typography sx={{ fontSize: '1.6rem', fontWeight: '500' }}>
            Your Payment is Successfull
          </Typography>
          <Typography
            sx={{
              color: '#7B7B7B',
              marginTop: '.4rem',
            }}
          >
            Thank you for your payment. An automated receipt will be sent to
            your registered email.
          </Typography>
          <Box
            sx={{
              textTransform: 'uppercase',
              marginTop: '.9rem',
              background: '#0ca90c',
              display: 'inline-block',
              padding: '.5rem 1rem',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'ease-in-out',
              transitionDuration: '300ms',

              '&:hover': {
                background: '#06661E',
              },
            }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
              continue shopping
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Success;
