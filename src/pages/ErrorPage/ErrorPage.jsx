import React from 'react';
import errorJPG from '../../assets/error.jpg'
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='w-11/12 mx-auto text-center'>
            <img className='mx-auto w-3xl' src={errorJPG} alt="" />
            <Link to='/'><a role="button" className="btn bg-[#cb3f02] text-white">Back to Home</a></Link>
        </div>
    );
};

export default ErrorPage;