import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from "axios";

const GoogleButton = (props) => {
  const [user, setUser] = useState({});


  const sendData = () => {
    props.parentCallback(`${user}`);
  };
  function handleTokenResponse(response) {
    const userObject = jwt_decode(response.credential);
    setUser(userObject);
    axios.post('http://localhost:3002/api/v1/auth/login-with-google', {
      email: userObject.email
    })
    console.log(userObject);
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
