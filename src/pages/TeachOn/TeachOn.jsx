import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

const TeachOn = () => {
    const { user } = useContext(AuthContext);
    const [status, setStatus] = useState(null);
    const [requestId, setRequestId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = {
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
            experience: form.experience.value,
            title: form.title.value,
            category: form.category.value,
            status: 'pending',
            role: 'user'
        };


        try {
            const res = await axios.post('https://edumanage-server-virid.vercel.app/teacher-requests', formData);
            setStatus('pending');
            setRequestId(res.data.insertedId);

            Swal.fire({
                icon: 'success',
                title: 'Submitted!',
                text: 'Your request has been submitted and is under review.',
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Submission failed. Please try again later.',
            });
        }
    };

    const fetchStatus = async () => {
        try {
            const res = await axios.get(`https://edumanage-server-virid.vercel.app/teacher-status?email=${user.email}`);
            const request = res.data;
            if (request) {
                setStatus(request.status);
                setRequestId(request._id);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleReRequest = async () => {
        try {
            await axios.patch(`https://edumanage-server-virid.vercel.app/teacher-requests/${requestId}`, { status: 'pending' });
            setStatus('pending');

            Swal.fire({
                icon: 'success',
                title: 'Re-Requested!',
                text: 'Your request has been submitted again.',
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: 'Could not re-submit. Try again later.',
            });
        }
    };

    useEffect(() => {
        if (user) {
            fetchStatus();
        }
    }, [user]);

    if (!user) return <p className='text-center mt-20'>Please log in to apply.</p>;

    if (status === 'approved') {
        return <div className="text-center mt-20 text-green-600 font-bold py-20">You are now a teacher on Edumanage!</div>;
    }

    if (status === 'rejected') {
        return (
            <div className="text-center mt-20">
                <p className="text-red-600 font-bold py-20">Your request was rejected.</p>
                <button onClick={handleReRequest} className="btn btn-warning mt-4">Request Again</button>
            </div>
        );
    }

    if (status === 'pending') {
        return <div className="text-center mt-20 text-yellow-600 font-bold py-20">Your request is under review.</div>;
    }

    return (
        <div className='py-20'>
            <div className="max-w-2xl mx-auto mt-20 p-4 shadow-lg bg-white rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Apply to Teach on Edumanage</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label>Name:</label>
                        <input type="text" value={user.displayName} disabled className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={user.email} disabled className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label>Photo URL:</label>
                        <input type="text" value={user.photoURL} disabled className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label>Experience:</label>
                        <select name="experience" className="select select-bordered w-full" required>
                            <option value="">Select</option>
                            <option value="beginner">Beginner</option>
                            <option value="mid-level">Mid-level</option>
                            <option value="experienced">Experienced</option>
                        </select>
                    </div>
                    <div>
                        <label>Title:</label>
                        <input type="text" name="title" className="input input-bordered w-full" placeholder="E.g., Frontend Instructor" required />
                    </div>
                    <div>
                        <label>Category:</label>
                        <select name="category" className="select select-bordered w-full" required>
                            <option value="">Select</option>
                            <option value="web development">Web Development</option>
                            <option value="digital marketing">Digital Marketing</option>
                            <option value="graphic design">Graphic Design</option>
                            <option value="data science">Data Science</option>
                            <option value="AI/ML">AI/ML</option>
                        </select>
                    </div>
                    <button type="submit" className="btn bg-[#cb3f02] text-white w-full">Submit for Review</button>
                </form>
            </div>
        </div>
    );
};

export default TeachOn;
