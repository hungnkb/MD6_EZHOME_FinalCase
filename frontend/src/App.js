import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import CardHome from "./pages/card/cardHome";
import DetailHome from "./pages/detail/detailHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home />}>
              <Route path='/home' element={<CardHome/>}/>
              <Route path='/detail-home' element={<DetailHome/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
