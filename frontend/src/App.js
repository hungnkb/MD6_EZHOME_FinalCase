import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import CardHome from "./pages/card/cardHome";
import DetailHome from "./pages/detail/detailHome";
import ModalHome from "./pages/home-action/modalHome";
import GoogleAuth from "./components/google/GoogleLogin";
import GoogleButton from "./components/google/GoogleLogin";
import Login from "./components/user/Login";
import Register from './components/user/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='' element={<Home />}>
              <Route path='/' element={<CardHome/>}/>
              <Route path='/detail-home/:id' element={<DetailHome/>}/>
              <Route path='/create-home' element={<ModalHome/>}></Route>
<<<<<<< HEAD
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
=======
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
>>>>>>> 49dd9d9f6fc41e8cd0c8c01ac46db3aaefbc56cc
              <Route path='/test' element={<GoogleButton />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
