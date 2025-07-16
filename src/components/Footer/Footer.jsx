import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-[#00262b] text-white p-10 py-20">
                <nav>
                    <h6 className="footer-title">Programs</h6>
                    <a className="link link-hover">Undergraduate</a>
                    <a className="link link-hover">Postgraduate</a>
                    <a className="link link-hover">Online Courses</a>
                    <a className="link link-hover">Workshops</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Institution</h6>
                    <a className="link link-hover">About Us</a>
                    <a className="link link-hover">Admissions</a>
                    <a className="link link-hover">Careers</a>
                    <a className="link link-hover">Media Center</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of Service</a>
                    <a className="link link-hover">Privacy Policy</a>
                    <a className="link link-hover">Academic Policies</a>
                </nav>
                <form>
                    <h6 className="footer-title">Newsletter</h6>
                    <fieldset className="w-80">
                        <label>Enter your email address</label>
                        <div className="join mt-3">
                            <input
                                type="text"
                                placeholder="username@site.com"
                                className="input input-bordered join-item" />
                            <button className="btn bg-[#cb3f02] text-white join-item">Subscribe</button>
                        </div>
                    </fieldset>
                </form>
            </footer>

        </div>
    );
};

export default Footer;