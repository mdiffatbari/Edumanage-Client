import React from 'react';
import { FaRegSmileBeam } from 'react-icons/fa';

const DashboardWelcome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <FaRegSmileBeam className="text-6xl text-orange-500 mb-4 animate-bounce" />
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
        Welcome to your Dashboard
      </h1>
      <p className="text-lg md:text-xl text-gray-600">
        Please select a menu item from the sidebar to continue.
      </p>
    </div>
  );
};

export default DashboardWelcome;
