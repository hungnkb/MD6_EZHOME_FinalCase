import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import CardHome from './pages/card/cardHome';
import DetailHome from './pages/detail/detailHome';
import ModalHome from './pages/home-action/modalHome';
import GoogleButton from './components/google/GoogleLogin';
import Login from './components/user/Login';
import CreateHome2 from './pages/home-action/create-home/createHome2';
import CreateHome21 from './pages/home-action/create-home/createHome21';
import CreateHome22 from './pages/home-action/create-home/createHome22';
import CreateHome23 from './pages/home-action/create-home/createHome23';
import Register from './components/user/Register';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import CreateHome24 from './pages/home-action/create-home/createHome24';
import NavbarCreate from './pages/home-action/create-home/navbarCreate';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLogin } from './redux/features/authSlice';
import DashboardHosting from './pages/hosting/dashboard';

function App() {
  const currentAuth = useSelector((state) => state.auth);
  const [token, setToken] = useState(null);

  const dispatch = useDispatch((state) => state.auth);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [localStorage.getItem('token')]);

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        let response = await axios({
          method: 'get',
          url: 'http://localhost:3002/api/v1/auth/profile',
          headers: {
            Authorization: JSON.parse(token),
          },
        });
        if (response) {
          dispatch(
            setUserLogin({
              isLogined: true,
              userLogin: response.data,
            }),
          );
        }
      }
    };
    verifyToken();
  }, [token]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />}>
          <Route path="/" element={<CardHome />} />
          <Route path="/detail-home/:id" element={<DetailHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<GoogleButton />} />
          <Route path="/user/hosting" element={<DashboardHosting />} />
        </Route>
        <Route path={''} element={<NavbarCreate />}>
          <Route path="/create-home" element={<CreateHome2 />}></Route>
          <Route path="/create-home/1" element={<CreateHome21 />}></Route>
          <Route path="/create-home/2" element={<CreateHome22 />}></Route>
          <Route path="/create-home/3" element={<CreateHome23 />}></Route>
          <Route path="/create-home/4" element={<CreateHome24 />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
