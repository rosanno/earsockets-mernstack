import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useLoginMutation } from '../redux/features/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/features/authSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const LoginDialog = (props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [login, { isLoading, isError }] = useLoginMutation();
  const dispatch = useDispatch();

  const handelClose = () => {
    props.setOpen(false);
    reset({
      email: '',
      password: '',
    });
  };

  const onSubmit = async (data) => {
    try {
      const userData = await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      dispatch(setCredentials({ ...userData }));
      reset({
        email: '',
        password: '',
      });
      props.setOpen(false);
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
      toast.error(error.data?.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  return (
    <Dialog open={props.open} onClose={() => props.setOpen(false)}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent
        sx={{
          width: {
            lg: '510px',
            md: '510px',
            xs: '390px',
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                  {...field}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  error={errors.email?.type === 'required' && true}
                />
              )}
            />
          </Box>
          <Box sx={{ marginTop: '20px' }}>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="standard"
                  {...field}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  error={errors.password?.type === 'required' && true}
                />
              )}
            />
          </Box>
          <Button
            type="submit"
            sx={{
              visibility: 'hidden',
            }}
          >
            Submit
          </Button>
        </form>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            fontSize: '.8rem',
            paddingLeft: '16px',
          }}
        >
          Don't have account?{' '}
          <Link
            to="/signup"
            style={{
              color: 'black',
              marginLeft: '.2rem',
              textDecoration: 'underline',
            }}
            onClick={() => props.setOpen(false)}
          >
            Sign up
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            color="success"
            variant="contained"
            onClick={handelClose}
            sx={{ marginRight: '14px', fontSize: '12px' }}
          >
            Cancel
          </Button>
          <Box sx={{ position: 'relative' }}>
            <Button
              color="success"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              sx={{ fontSize: '12px' }}
            >
              Login
            </Button>
            {isLoading && (
              <CircularProgress
                size={20}
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
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
