import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import SignUp from './components/user/SignUp';
import Login from './components/user/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
