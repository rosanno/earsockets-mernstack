import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import {
  useDecreaseQuantityMutation,
  useDeleteCartItemMutation,
  useIncreaseQuantityMutation,
} from '../redux/features/cartSlice';
import { useCheckoutMutation } from '../redux/features/stripeApiSlice';

const Cart = (props) => {
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [increaseQuantity] = useIncreaseQuantityMutation();
  const [decreaseQuantity] = useDecreaseQuantityMutation();
  const [checkout, { isLoading: loading }] = useCheckoutMutation();

  const handleDeleteCartItem = async (productId) => {
    try {
      await deleteCartItem(productId).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantity = async (productId, quantity, type) => {
    try {
      if (type === 'increase') {
        await increaseQuantity({
          productId,
          quantity,
        }).unwrap();
      } else {
        await decreaseQuantity({ productId, quantity }).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await checkout({ cartItems: props.result?.data }).unwrap();
      if (res?.url) {
        window.location.href = res?.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={props.toggleDrawer}
      onClose={() => props.setToggleDrawer(false)}
    >
      <Box
        sx={{
          width: '450px',
        }}
      >
        {props.result.data?.product.length === 0 || props.result.isError ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '40rem',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'semibold',
                color: 'gray',
              }}
            >
              cart is empty
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
            }}
          >
            <Typography
              sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#013d29' }}
            >
              Cart
            </Typography>
            {props.result.data?.product.map((item) => (
              <Box
                key={item._id}
                sx={{
                  margin: '.9rem 0',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  <IconButton
                    sx={{
                      alignSelf: 'self-start',
                    }}
                    onClick={() => handleDeleteCartItem(item.productId._id)}
                  >
                    <DeleteOutlinedIcon color="error" />
                  </IconButton>
                  <img
                    src={item.colorImg[0]}
                    alt=""
                    style={{
                      width: '130px',
                      height: '130px',
                    }}
                  />
                  <Box
                    sx={{
                      marginTop: '1rem',
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                      }}
                    >
                      {item.productId.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '.7rem',
                        fontWeight: '500',
                        color: '#444',
                      }}
                    >
                      {item.color.map((c) => (
                        <span key={c}>{c}, </span>
                      ))}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '0 1.2rem',
                    marginTop: '14px',
                  }}
                >
                  <span>Quantity:</span>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      bgcolor: '#F6F6F6',
                      borderRadius: '10px',
                      padding: '.2rem .5rem',
                    }}
                  >
                    <IconButton
                      disabled={item.quantity <= 1 && true}
                      onClick={() => handleQuantity(item.productId._id, 1)}
                    >
                      <RemoveIcon
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          color: '#013d29',
                        }}
                      />
                    </IconButton>
                    <Box
                      component="input"
                      value={item.quantity}
                      readOnly={true}
                      sx={{
                        width: '45px',
                        textAlign: 'center',
                        padding: '.2rem .2rem',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        color: '#013D29',
                        border: 'none',
                        cursor: 'default',
                        background: 'transparent',

                        '&:focus': {
                          outline: 'none',
                        },
                      }}
                    />
                    <IconButton
                      onClick={() =>
                        handleQuantity(item.productId._id, 1, 'increase')
                      }
                    >
                      <AddIcon
                        sx={{
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          color: '#013d29',
                        }}
                      />
                    </IconButton>
                  </Box>
                  <Typography
                    sx={{
                      marginLeft: 'auto',
                      fontWeight: '600',
                      color: '#013D29',
                    }}
                  >
                    ${item.total}
                  </Typography>
                </Box>
              </Box>
            ))}
            <Box
              sx={{
                marginTop: 'auto',
                padding: '0 .2rem',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography sx={{ fontSize: '1.4rem', color: '#013D29' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '.3rem' }}>
                    Total:
                  </span>{' '}
                  <span style={{ fontWeight: '500' }}>
                    ${props.result.data?.subTotal.toFixed(2)}
                  </span>
                </Typography>
                <Box sx={{ position: 'relative' }}>
                  <Button
                    color="success"
                    variant="contained"
                    disableElevation
                    disabled={loading}
                    onClick={handleCheckOut}
                  >
                    checkout
                  </Button>
                  {loading && (
                    <CircularProgress
                      size="1.3rem"
                      sx={{
                        position: 'absolute',
                        right: '45px',
                        top: '7px',
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default Cart;
