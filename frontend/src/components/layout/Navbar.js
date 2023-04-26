import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../user/Login';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUserLogin } from '../../redux/features/authSlice';
import Swal from 'sweetalert2';
import AddPhone from '../auth/addPhone';
import SearchBar from '../home/SearchBar/SearchBar';
import axios from 'axios';
import { io } from 'socket.io-client';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { axiosCustom } from '../../service/axios';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [id, setId] = useState(null);
  const [isHost, setIsHost] = useState(true);
  const [phoneOfUserExist, setPhoneOfUserExist] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [pageNoti, setPageNoti] = useState(1);
  const [endNoti, setEndNoti] = useState(false);
  const [isFetchNoti, setIsFetchNoti] = useState(false);
  const currentState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = io.connect('http://localhost:3002/notifications');
  const open = Boolean(anchorElNotifications);
  const email = localStorage.getItem('email');

  useEffect(() => {
    setId(currentState.userLogin.sub);
  }, [currentState]);

  useEffect(() => {
    const getData = async () => {
      if (pageNoti && currentState.userLogin.sub) {
        const method = 'get';
        const url = `${process.env.REACT_APP_BASE_URL}/notifications?idUser=${currentState.userLogin.sub}&page=${pageNoti}`;
        const token = localStorage.getItem('token');
        const response = await axios({
          method,
          url,
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        if (response.data.length == 0) {
          setEndNoti(true);
        } else {
          setEndNoti(false);
          setNotifications([...notifications, ...response.data]);
        }
      }
    };
    getData();
  }, [pageNoti, currentState.userLogin.sub, isFetchNoti]);
  const handleMoreNoti = () => {
    setPageNoti(pageNoti + 1);
  };

  useEffect(() => {
    socket.on('getNotification', (res) => {
      if (id && res.idReciever == id) {
        //   const newNotifications = [
        //     ...notifications,
        //     {
        //       message: res.message,
        //       dataUrl: `${res.dataUrl}`,
        //     },
        //   ];
        //   setNotifications(newNotifications);
        setIsFetchNoti(!isFetchNoti);
      }
    });
  }, [socket]);

  useEffect(() => {
    axios
      .get(`http://localhost:3002/api/v1/users?email=${email}`)
      .then((response) => {
        const { fullName, phone, address } = response.data;
        if (!phone) {
          setPhoneOfUserExist(!phoneOfUserExist);
        }
      });
  }, [email]);

  const handleClickNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };
  const handleCloseNotifications = (url) => {
    setAnchorElNotifications(null);
    if (typeof url === 'string') {
      navigate(`${url}`);
    }
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
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  const handleSwitchHosting = () => {
    if (
      currentState.userLogin.active &&
      currentState.userLogin.role === 'host'
    ) {
      navigate('/user/hosting');
    } else if (
      currentState.userLogin.active &&
      currentState.userLogin.role == 'user' &&
      phoneOfUserExist === true
    ) {
      axios({
        method: 'PUT',
        url: 'http://localhost:3002/api/v1/users/',
        data: {
          email: email,
          role: 'host',
        },
        headers: {
          Authorization: JSON.parse(localStorage.getItem('token')),
        },
      });
      navigate('/user/hosting');
    } else if (
      currentState.userLogin.active &&
      currentState.userLogin.role == 'user' &&
      currentState.newPhone
    ) {
      axios({
        method: 'PUT',
        url: 'http://localhost:3002/api/v1/users/',
        data: {
          email: email,
          role: 'host',
        },
        headers: {
          Authorization: JSON.parse(localStorage.getItem('token')),
        },
      });
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
      {currentState.isLogined ? (
        <div>
          <MenuItem
            onClick={() => {
              handleLogout();
              handleMenuClose();
            }}
          >
            Logout
          </MenuItem>
          <MenuItem>
            <Link
              style={{ textDecoration: 'none', color: 'Black' }}
              to="/user/profile"
            >
              My account
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              style={{ textDecoration: 'none', color: 'Black' }}
              to="/user/order"
            >
              My Orders
            </Link>
          </MenuItem>
        </div>
      ) : (
        <MenuItem onClick={handleMenuClose}>
          <Login />
        </MenuItem>
      )}
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
        ></IconButton>
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
      <AppBar
        position="static"
        style={{
          background: 'white',
          color: 'black',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Toolbar firstChild={true} float="left">
          <Link to="/">
            <img
              style={{ width: 100 }}
              src="https://cebuhomebuilders.com/wp-content/uploads/2020/10/ez-home-768-x-331-px.jpg"
            />
          </Link>
        </Toolbar>
        <Toolbar
          style={{
            flexGrow: 1,
            textAlign: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <SearchBar />
        </Toolbar>
        <Toolbar lastChild={true} float="right">
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
          <IconButton>
            {notifications.length === 0 ? (
              <NotificationsNoneIcon />
            ) : (
              <div>
                <Badge badgeContent={notifications.length} color="warning">
                  <NotificationsIcon
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickNotifications}
                    style={{ color: 'black' }}
                  />
                </Badge>
                <div id="noti">
                  <Menu
                    id="noti-menu"
                    anchorEl={anchorElNotifications}
                    open={open}
                    onClose={handleCloseNotifications}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    {notifications.map((noti, index) => (
                      <MenuItem
                        key={`${index}-${noti}`}
                        onClick={() => {
                          handleCloseNotifications(noti.dataUrl);
                        }}
                      >
                        {noti.message}
                      </MenuItem>
                    ))}
                    {!endNoti && (
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                        onClick={handleMoreNoti}
                      >
                        See more
                      </div>
                    )}
                  </Menu>
                </div>
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
              <MenuIcon fontSize="small" /> <AccountCircle fontSize="large" />{' '}
            </Button>
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}
