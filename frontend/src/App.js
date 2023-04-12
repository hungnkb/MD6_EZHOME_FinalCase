import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import Login from './components/login/Login';
import SignUp from './components/user/SignUp';
import GoogleButton from "./components/google/GoogleLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/test' element={<GoogleButton />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
