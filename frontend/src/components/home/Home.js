// import React from 'react'
import Navbar from '../layout/Navbar';
import CardHome from '../../pages/card/cardHome';
import Footer from '../layout/footer';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <>
          <Navbar />
     
          
            <Outlet />
       
      
     
              <Footer />
        
      
      
    </>
  );
}

export default Home;
