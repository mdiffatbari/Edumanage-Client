import React from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const Register = () => {
    const { createUser, setUser, updateUser, signInWithGoogle } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        Swal.fire({
                            icon: 'success',
                            title: 'Registration Successful!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/');
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Profile Update Failed',
                            text: error.message
                        });
                    });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message
                });
            });
    };

    const handleGoogleRegister = () => {
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                setUser(user);
                Swal.fire({
                    icon: 'success',
                    title: 'Registered with Google!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Google Registration Failed',
                    text: error.message
                });
            });
    };

    return (
        <div className='lg:mt-60 mt-24'>
            <div className='flex justify-center items-center px-4'>
                <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                    <form onSubmit={handleRegister} className="card-body">
                        <h1 className='font-bold text-center text-2xl mb-3'>Register</h1>
                        <fieldset className="space-y-2">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="name" type="text" className="input input-bordered w-full" placeholder="Full Name" required />

                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" className="input input-bordered w-full" placeholder="Email" required />

                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input name="photo" type="text" className="input input-bordered w-full" placeholder="Photo URL" required />

                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" className="input input-bordered w-full" placeholder="Password" required />

                            <button type='submit' className="btn btn-neutral w-full mt-4">Register</button>

                            <button
                                type="button"
                                onClick={handleGoogleRegister}
                                className="btn bg-white text-black border-[#e5e5e5] w-full"
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
                                Register with Google
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
            <p className='text-center text-sm mt-10'>
                Already have an account? <Link className='font-bold text-[#cb3f02]' to='/auth/login'>Log In</Link>
            </p>
        </div>
    );
};

export default Register;
