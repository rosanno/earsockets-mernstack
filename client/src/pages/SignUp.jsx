import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useSignupMutation } from '../redux/features/authApiSlice';
import { setCredentials } from '../redux/features/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      address: '',
      email: '',
      password: '',
    },
  });
  const [signup, { isLoading, isError }] = useSignupMutation();

  const onSubmit = async (data) => {
    try {
      const userData = await signup({
        name: data.name,
        address: data.address,
        email: data.email,
        password: data.password,
      }).unwrap();
      dispatch(setCredentials({ ...userData }));
      reset({
        name: '',
        address: '',
        email: '',
        password: '',
      });
      navigate('/');
      if (!isError)
        toast.success(`Welcome ${userData.user?.name}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: '7rem' }}>
      <Typography
        sx={{
          textAlign: 'center',
          marginTop: '3rem',
          fontSize: '2rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          color: '#013D29',
        }}
      >
        Sign Up
      </Typography>
      <Box
        px="5rem"
        py="2rem"
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              width: {
                lg: '540px',
                xs: '410px',
              },
              marginTop: '.8rem',
              marginBottom: '1rem',
            }}
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  sx={{ margin: '1.1rem 0' }}
                  {...field}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  error={errors.name?.type === 'required' && true}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  margin="dense"
                  label="Address"
                  type="text"
                  fullWidth
                  variant="outlined"
                  sx={{ margin: '1.1rem 0' }}
                  {...field}
                  aria-invalid={errors.address ? 'true' : 'false'}
                  error={errors.address?.type === 'required' && true}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  margin="dense"
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  sx={{ margin: '1.1rem 0' }}
                  {...field}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  error={errors.email?.type === 'required' && true}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  margin="dense"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  {...field}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  error={errors.password?.type === 'required' && true}
                />
              )}
            />
          </Box>
          <Box sx={{ position: 'relative' }}>
            <Button
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                padding: '.6rem 0',
                background: '#06661E',
                '&:hover': {
                  background: '#013D29',
                },
              }}
              type="submit"
            >
              signup
            </Button>
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
