import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#00262b] text-white">
            <div className="max-w-[1660px] mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4">
                
                {/* Left Side - Text */}
                <h1 className="text-center md:text-left text-sm md:text-base">
                    2025 All Right Reserved By Md Iffat Bari.
                </h1>

                {/* Right Side - Social Icons */}
                <div className="flex space-x-4">
                    <a
                        href="https://facebook.com/mdiffatbari"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#cb3f02] transition text-xl"
                    >
                        <FaFacebookF />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/mdiffatbari/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#cb3f02] transition text-xl"
                    >
                        <FaLinkedinIn />
                    </a>
                    <a
                        href="https://x.com/mdiffatbari"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#cb3f02] transition text-xl"
                    >
                        <FaTwitter />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
