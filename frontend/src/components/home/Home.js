// import React from 'react'
import Navbar from "../layout/Navbar";
import CardHome from "../../pages/card/cardHome";
import Footer from "../layout/footer";
import {Outlet} from "react-router-dom";

function Home() {

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <Navbar/>
                </div>
                <div className="row">
                    <div className="col-12">
                           <Outlet/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                            <Footer/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
