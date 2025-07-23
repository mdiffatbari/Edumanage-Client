import React, { useEffect, useState } from 'react';
import useAuthContext from '../../../hooks/useAuthContext';
import { Link } from 'react-router';
import axios from 'axios';

const MyClass = () => {
    const { user } = useAuthContext();
    const [myClasses, setMyClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`http://localhost:3000/classes?email=${user.email}`)
                .then((res) => {
                    setMyClasses(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user]);


    const handleDelete = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this class?');
        if (confirm) {
            try {
                await axios.delete(`https://your-server-url/classes/${id}`);
                setMyClasses(myClasses.filter((item) => item._id !== id));
            } catch (error) {
                console.error('Delete failed:', error);
            }
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="p-5 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">My Classes</h2>

            {myClasses.length === 0 ? (
                <p className="text-center">No classes added yet.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-3">
                    {myClasses.map((classItem) => (
                        <div
                            key={classItem._id}
                            className="bg-white shadow-md rounded-xl overflow-hidden border"
                        >
                            <img
                                src={classItem.image}
                                alt={classItem.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 space-y-2">
                                <h3 className="text-xl font-semibold">{classItem.title}</h3>
                                <p><strong>Name:</strong> {classItem.name}</p>
                                <p><strong>Email:</strong> {classItem.email}</p>
                                <p><strong>Price:</strong> ${classItem.price}</p>
                                <p><strong>Description:</strong> {classItem.description}</p>
                                <p>
                                    <strong>Status:</strong>{' '}
                                    <span
                                        className={`font-medium ${classItem.status === 'approved'
                                                ? 'text-green-600'
                                                : classItem.status === 'rejected'
                                                    ? 'text-red-600'
                                                    : 'text-yellow-600'
                                            }`}
                                    >
                                        {classItem.status}
                                    </span>
                                </p>
                                <div className="mt-3 flex flex-col gap-2">
                                    <Link
                                        to={`/dashboard/update-class/${classItem._id}`}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-center hover:bg-blue-700"
                                    >
                                        Update
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(classItem._id)}
                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        to={`/dashboard/class-details/${classItem._id}`}
                                        className="bg-gray-700 text-white px-4 py-2 rounded-md text-center hover:bg-gray-800"
                                    >
                                        See Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyClass;
