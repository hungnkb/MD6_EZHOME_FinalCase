import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../user/Login';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUserLogin } from '../../redux/features/authSlice';
import Swal from 'sweetalert2';
import AddPhone from '../auth/addPhone';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [message, setMessage] = useState('');
  const currentState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHost, setIsHost] = useState(true);

  const callbackFunction = (childData) => {
    setMessage(childData);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  console.log(currentState.isLogined)
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSwitchHosting = () => {
    if (
        currentState.userLogin.active &&
        currentState.userLogin.role === 'host'
    ) {
      navigate('/user/hosting');
    } else if (
        currentState.userLogin.active &&
        currentState.userLogin.role == 'user'
    ) {
      setIsHost(false);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please active your account first',
      });
    }
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
      <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>

        {currentState.isLogined ? (
            <MenuItem
                onClick={() => {
                  handleLogout();
                  handleMenuClose();
                  // removeEmailLocalStorage();
                }}
            >
              Logout
            </MenuItem>
        ) : (
            <MenuItem onClick={handleMenuClose}>
              <Login />
            </MenuItem>
        )}
        <MenuItem>
          <Link style={{textDecoration: 'none', color: "Black"}} to="/profile">My account</Link>
        </MenuItem>
      </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
      <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
          >
            {/*<Badge badgeContent={17} color="error">*/}
            {/*  <NotificationsIcon />*/}
            {/*</Badge>*/}
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
  );

  return (
      <>
        {!isHost && <AddPhone isHost={isHost} setIsHost={setIsHost} />}
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
              position="static"  sx={{ top: 0 }}
              style={{ background: 'white', color: 'black' }}
          >
            <Toolbar>
              <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
              >
                {/*<MenuIcon/>*/}
              </IconButton>
              <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                <Link to={'/'}>
                  <img
                      style={{ width: 100 }}
                      src="https://cebuhomebuilders.com/wp-content/uploads/2020/10/ez-home-768-x-331-px.jpg"
                  />
                </Link>
              </Typography>
              <Search
                  style={{
                    border: '2px solid black',
                    marginLeft: '300px',
                    borderRadius: '30px',
                    width: 400,
                  }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton>
                  {currentState.isLogined && (
                      <div onClick={handleSwitchHosting}>
                        <p style={{ fontSize: '15px', marginTop: '8px' }}>
                          {' '}
                          <b> Switch to hosting</b>{' '}
                        </p>
                      </div>
                  )}
                </IconButton>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                  <Button
                      style={{
                        borderRadius: '30px',
                        color: 'black',
                        border: '1px solid gray',
                        width: '80px',
                      }}
                  >
                    {' '}
                    <MenuIcon fontSize="small" />{' '}
                    <AccountCircle fontSize="large" />{' '}
                  </Button>
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Box>
      </>
  );
}