import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HeadsetIcon from '@mui/icons-material/Headset';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { Badge } from '@mui/material';
import Cart from './Cart';
import LoginDialog from './LoginDialog';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logOut } from '../redux/features/authSlice';
import { useLazyGetCartQuery } from '../redux/features/cartSlice';
import { useLazyLogoutQuery } from '../redux/features/logOutApiSlice';

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        elevation={trigger ? 1 : 0}
        sx={{
          bgcolor: 'white',
          zIndex: '0',
          padding: {
            lg: '0 5rem',
          },
        }}
      >
        {children}
      </AppBar>
    </Slide>
  );
}

const Navbar = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const [loadCart, result] = useLazyGetCartQuery();
  const [logout] = useLazyLogoutQuery();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (auth?.token) loadCart();
  }, [auth?.token]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    logout();
    dispatch(logOut());
  };

  const handleCartDrawer = () => {
    if (!auth.token) {
      setOpen(true);
    } else {
      setToggleDrawer(true);
    }
  };

  return (
    <>
      <HideOnScroll {...props}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <HeadsetIcon
              sx={{
                display: { xs: 'none', md: 'flex' },
                mr: 1,
                color: '#013D29',
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#013D29',
                textDecoration: 'none',
              }}
            >
              EARSOCKETS
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
                color: 'black',
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    to="/"
                    style={{
                      textDecoration: 'none',
                      display: 'inline-block',
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'black',
                        display: 'block',
                        fontWeight: 'bold',
                        fontSize: '.8rem',
                      }}
                    >
                      Home
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    to="/shop"
                    style={{
                      textDecoration: 'none',
                      display: 'inline-block',
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'black',
                        display: 'block',
                        fontWeight: 'bold',
                        fontSize: '.8rem',
                      }}
                    >
                      SHOP
                    </Typography>
                  </Link>
                </MenuItem>
                {auth.token && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link
                      to="/order"
                      style={{
                        textDecoration: 'none',
                        display: 'inline-block',
                      }}
                    >
                      <Typography
                        sx={{
                          color: 'black',
                          display: 'block',
                          fontWeight: 'bold',
                          fontSize: '.8rem',
                        }}
                      >
                        ORDER
                      </Typography>
                    </Link>
                  </MenuItem>
                )}
                {!auth?.token && (
                  <Box>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography
                        sx={{
                          textTransform: 'uppercase',
                          color: 'black',
                          display: 'block',
                          fontWeight: 'bold',
                          fontSize: '.7rem',
                        }}
                        onClick={() => setOpen(true)}
                      >
                        Login
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link
                        style={{
                          color: 'black',
                          marginRight: '6px',
                          textDecoration: 'none',
                          textTransform: 'uppercase',
                          fontSize: '.7rem',
                          fontWeight: '500',
                        }}
                        to="/signup"
                      >
                        <Typography
                          sx={{
                            textTransform: 'uppercase',
                            color: 'black',
                            display: 'block',
                            fontWeight: 'bold',
                            fontSize: '.8rem',
                          }}
                        >
                          Signup
                        </Typography>
                      </Link>
                    </MenuItem>
                  </Box>
                )}
              </Menu>
            </Box>
            <HeadsetIcon
              sx={{
                display: { xs: 'flex', md: 'none' },
                mr: 1,
                color: '#013D29',
              }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: '#013D29',
                textDecoration: 'none',
              }}
            >
              EARSOCKETS
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: location.pathname === '/' ? '#06661E' : 'black',
                    display: 'block',
                    fontWeight: 'bold',
                    fontSize: '.8rem',
                  }}
                >
                  Home
                </Button>
              </Link>
              <Link
                to="/shop"
                style={{
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: location.pathname === '/shop' ? '#06661E' : 'black',
                    display: 'block',
                    fontWeight: 'bold',
                    fontSize: '.8rem',
                  }}
                >
                  SHOP
                </Button>
              </Link>
              {auth.token && (
                <Link
                  to="/order"
                  style={{
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: 'black',
                      display: 'block',
                      fontWeight: 'bold',
                    }}
                  >
                    ORDER
                  </Button>
                </Link>
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {!auth?.token && (
                <>
                  <Button
                    sx={{
                      color: 'black',
                      fontSize: '.8rem',
                      display: {
                        xs: 'none',
                        md: 'inline-block',
                        xl: 'inline-block',
                      },
                      marginRight: '6px',
                    }}
                    onClick={() => setOpen(true)}
                  >
                    Login
                  </Button>
                  <Box
                    sx={{
                      display: {
                        xs: 'none',
                        md: 'inline-block',
                        xl: 'inline-block',
                      },
                    }}
                  >
                    <Link
                      style={{
                        color: 'black',
                        marginRight: '6px',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        fontSize: '.8rem',
                        fontWeight: '500',
                      }}
                      to="/signup"
                    >
                      Signup
                    </Link>
                  </Box>
                </>
              )}
              {auth?.token && (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        sx={{
                          width: '30px',
                          height: '30px',
                        }}
                      >
                        {auth.user?.name.slice(0, 1)}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center' }}
                        onClick={handleLogOut}
                      >
                        <Typography
                          textAlign="center"
                          fontSize=".8rem"
                          mr="20px"
                        >
                          Logout
                        </Typography>
                        <LogoutIcon fontSize=".8rem" />
                      </Box>
                    </MenuItem>
                  </Menu>
                </>
              )}
              <IconButton
                sx={{
                  marginLeft: '14px',
                }}
                onClick={handleCartDrawer}
              >
                <Badge
                  badgeContent={auth?.token && result.data?.product.length}
                  color="error"
                >
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </HideOnScroll>
      <Box>
        <Cart
          toggleDrawer={toggleDrawer}
          setToggleDrawer={setToggleDrawer}
          result={result}
        />
      </Box>
      <Box>
        <LoginDialog open={open} setOpen={setOpen} />
      </Box>
    </>
  );
};
export default Navbar;
