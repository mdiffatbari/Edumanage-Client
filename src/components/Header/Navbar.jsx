import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import logoIcon from "../../assets/logo.png";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logOut().catch(err => alert(err.message));
    };

    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/gallery">Gallery</NavLink></li>
            <li><NavLink to="/all-classes">All Classes</NavLink></li>
            <li><NavLink to="/teach-on">Teach on EduManage</NavLink></li>
        </>
    );

    return (
        <div className='bg-[#f8f8f8] sticky left-0 top-0 z-50'>
            <div className="navbar bg-[#f8f8f8] px-4 md:px-8 flex justify-between items-center md:max-w-[1660px] mx-auto">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <img src={logoIcon} alt="EduManage Logo" className="h-10 w-auto" />
                    <Link to="/" className="text-xl font-semibold">EduManage</Link>
                </div>

                {/* Right: Menu & User - large screen */}
                <div className="hidden lg:flex items-center gap-6">
                    {/* Nav Links */}
                    <ul className="menu menu-horizontal gap-4 font-medium">
                        {navLinks}
                    </ul>

                    {/* Auth section */}
                    {!user ? (
                        <Link to="/auth/login" className="btn bg-[#cb3f02] text-white rounded-full px-6">
                            Sign In
                        </Link>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                                        alt="User"
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li className="text-gray-700 font-semibold px-3 py-1 cursor-default">
                                    {user.displayName || "Anonymous User"}
                                </li>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><button onClick={handleLogout}>Logout</button></li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Right - Mobile */}
                <div className="flex items-center gap-2 lg:hidden">
                    {user ? (
                        <div className="avatar">
                            <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    src={user.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                                    alt="User"
                                />
                            </div>
                        </div>
                    ) : (
                        <Link to="/auth/login" className="btn btn-sm bg-[#cb3f02] text-white rounded-full">
                            Sign In
                        </Link>
                    )}
                    <button
                        className="btn btn-ghost btn-circle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Dropdown */}
                {isMenuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-base-100 shadow-lg z-50 lg:hidden">
                        <ul className="menu p-4 space-y-2 font-medium">
                            {navLinks}
                            {user ? (
                                <>
                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                    <li><button onClick={handleLogout}>Logout</button></li>
                                </>
                            ) : (
                                <li>
                                    <Link to="/auth/login" className="btn bg-[#cb3f02] text-white w-full">
                                        Sign In
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );

};

export default Navbar;
