import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import CardHome from "./pages/card/cardHome";
import DetailHome from "./pages/detail/detailHome";
import ModalHome from "./pages/home-action/modalHome";
import GoogleAuth from "./components/google/GoogleLogin";
import GoogleButton from "./components/google/GoogleLogin";
import SignUp from "./components/user/SignUp";
import Login from "./components/user/Login";
import DatePickerExample from "./pages/payments/date";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='' element={<Home />}>
              <Route path='/' element={<CardHome/>}/>
              <Route path='/detail-home/:idHome' element={<DetailHome/>}/>
              <Route path='/create-home' element={<ModalHome/>}></Route>
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/login' element={<Login/>} />
              <Route path='/test' element={<GoogleButton />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
