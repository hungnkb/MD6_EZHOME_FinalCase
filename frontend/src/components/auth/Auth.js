import React from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
const Auth = ({ children }) => {
    return (
      <div className="w-full h-full">
        <div className="flex w-full h-screen md:w-2/3 py-8 mx-auto">
          <div className="">
          
          </div>

          <div className="flex flex-col gap-3 w-full md:w-2/5">
            {children}

          
            <div className="flex gap-3 justify-center">
         
      
            </div>
          </div>
        </div>
      </div>
    );
}

export default Auth