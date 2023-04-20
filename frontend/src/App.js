import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import CardHome from './pages/card/cardHome';
import DetailHome from './pages/detail/detailHome';
import CreateHome2 from './pages/home-action/create-home/createHome2';
import CreateHome21 from './pages/home-action/create-home/createHome21';
import CreateHome22 from './pages/home-action/create-home/createHome22';
import CreateHome23 from './pages/home-action/create-home/createHome23';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import CreateHome24 from './pages/home-action/create-home/createHome24';
import NavbarCreate from './pages/home-action/create-home/navbarCreate';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLogin } from './redux/features/authSlice';
import DashboardHosting from './pages/hosting/dashboard';
import UpdateUser from './components/user/UpdateUser';
import ResetPassword from './components/user/ResetPassword';
import HomeRenting from './pages/hosting/homeRenting';
function App() {
  const currentAuth = useSelector((state) => state.auth);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch((state) => state.auth);
  const [fetchUserData, setFetchUserData] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [localStorage.getItem('token'), currentAuth.isFetchDataUser]);
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
          localStorage.setItem('idUser', response.data.sub);
        }
      }
    };
    verifyToken();
  }, [token, fetchUserData, currentAuth.isFetchDataUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />}>
          <Route path="/" element={<CardHome />} />
          <Route path="/detail-home/:id" element={<DetailHome />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/user/hosting" element={<DashboardHosting />} />
          <Route path="/user/profile" element={<UpdateUser />} />
          <Route path="/user/home" element={<HomeRenting />}></Route>
          <Route path="/homes" element={<CardHome />}></Route>
        </Route>
        <Route
          path={''}
          element={
            <NavbarCreate
              setFetchUserData={setFetchUserData}
              fetchUserData={fetchUserData}
            />
          }
        >
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
