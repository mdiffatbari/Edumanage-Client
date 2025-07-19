import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const LogIn = () => {
    const { signIn, signInWithGoogle, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then((result) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged in successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message,
                });
            });
    };

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then((result) => {
                setUser(result.user);
                Swal.fire({
                    icon: 'success',
                    title: 'Logged in with Google!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Google Login Failed',
                    text: error.message,
                });
            });
    };

    return (
        <div className='lg:mt-60 mt-24'>
            <div className='flex justify-center'>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogIn} className="card-body">
                        <h1 className='font-bold text-center text-2xl mb-3'>Log in to your account</h1>
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input name="email" type="email" className="input input-bordered w-full" placeholder="Email" required />

                            <label className="label">Password</label>
                            <input name="password" type="password" className="input input-bordered w-full" placeholder="Password" required />

                            <div><a className="link link-hover">Forgot password?</a></div>

                            <button type='submit' className="btn btn-neutral mt-4">Login</button>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="btn bg-white text-black border-[#e5e5e5] mt-2"
                            >
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="mr-2">
                                    <g>
                                        <path d="m0 0H512V512H0" fill="#fff"></path>
                                        <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                        <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                        <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                                    </g>
                                </svg>
                                Login with Google
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
            <p className='text-center mt-10'>
                Don't have an account?
                <Link className='font-bold text-[#cb3f02]' to='/auth/register'> Register</Link>
            </p>
        </div>
    );
};

export default LogIn;
