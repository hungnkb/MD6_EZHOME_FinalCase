import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import SignUp from './components/user/SignUp';
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/sign-up' element={<SignUp />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
