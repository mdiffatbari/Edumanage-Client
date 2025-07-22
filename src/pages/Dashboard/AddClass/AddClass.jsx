import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const AddClass = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) return <div className="text-center mt-10">Loading user info...</div>;

    const handleImageUpload = async (imgFile) => {
        const formData = new FormData();
        formData.append('image', imgFile);

        const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=6552163d2b6aacc4fd9f2781300a40cf`,
            formData
        );
        return res.data.data.url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const imgUrl = await handleImageUpload(image);

            const classData = {
                title,
                name: user?.displayName || 'N/A',
                email: user?.email || 'N/A',
                price: parseFloat(price),
                description,
                image: imgUrl,
                status: 'pending',
            };


            await axios.post('http://localhost:3000/classes', classData);

            Swal.fire({
                icon: 'success',
                title: 'Class added!',
                text: 'Your class has been submitted for review.',
                timer: 2000,
                showConfirmButton: false,
            });

            // Optional: Reset form
            setTitle('');
            setPrice('');
            setDescription('');
            setImage(null);

            navigate('/dashboard/my-class');
        } catch (err) {
            console.error('Error adding class:', err);
            Swal.fire({
                icon: 'error',
                title: 'Failed to add class',
                text: err?.message || 'Something went wrong!',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Add Class</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            value={user?.displayName || ''}
                            disabled
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="textarea textarea-bordered w-full"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                        className="file-input file-input-bordered w-full"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn bg-[#cb3f02] text-white w-full"
                >
                    {loading ? 'Uploading...' : 'Add Class'}
                </button>
            </form>
        </div>
    );
};

export default AddClass;
