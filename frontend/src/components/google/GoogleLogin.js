import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setIsFetDataUser } from '../../redux/features/authSlice';
import Swal from 'sweetalert2';

const GoogleButton = (props) => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const currentAuth = useSelector((state) => state.auth);

  const sendData = () => {
    props.parentCallback(`${user}`);
  };
  function handleTokenResponse(response) {
    const userObject = jwt_decode(response.credential);
    setUser(userObject);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/login-with-google`, {
        email: userObject.email,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem(
            'token',
            JSON.stringify(response.data.accessToken),
          );
          dispatch(setIsFetDataUser(!currentAuth.isFetDataUser));
          props.handleClose();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login Success',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          localStorage.setItem(
            'token',
            JSON.stringify(response.data.accessTokenWithNewUser),
          );
          dispatch(setIsFetDataUser(!currentAuth.isFetDataUser));
          props.handleClose();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Register Success, please check your Email to Active',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        '1079258411381-d7dle0hglsh47e6icqdetrtqh3jj6e47.apps.googleusercontent.com',
      callback: handleTokenResponse,
    });
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);

  return <div onClick={sendData} id="signInDiv"></div>;
};

export default GoogleButton;
