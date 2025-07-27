import React from 'react';
import logo from "../../../assets/logo.png"

const DashboardWelcome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
        <img
        className='animate-bounce mb-4 w-2/5 mx-auto'
         src={logo} alt="" />
        Welcome to your Dashboard
      </h1>
      <p className="text-lg md:text-xl text-[#cb3f02]">
        Please select a menu item from the sidebar to continue.
      </p>
    </div>
  );
};

export default DashboardWelcome;
