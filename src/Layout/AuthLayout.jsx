import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;