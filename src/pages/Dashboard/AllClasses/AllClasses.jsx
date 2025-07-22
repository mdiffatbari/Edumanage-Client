import { useEffect, useState } from 'react';
import axios from 'axios';

const AllClasses = () => {
    const [classes, setClasses] = useState([]);

    const fetchClasses = async () => {
        const res = await axios.get('http://localhost:3000/classes');
        setClasses(res.data);
    };

    const handleStatusUpdate = async (id, status) => {
        await axios.patch(`http://localhost:3000/classes/${id}`, { status });
        fetchClasses(); // refresh list
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    return (
        <div className="p-4  mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">All Classes</h2>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
                {classes.map((item) => (
                    <div key={item._id} className="card bg-base-100 shadow-md p-4 rounded-xl">
                        <div className="flex items-center space-x-4">
                            <img src={item.image} alt="Class" className="w-20 h-20 object-cover rounded-lg" />
                            <div>
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.email}</p>
                                <p className="text-sm mt-1">{item.description?.slice(0, 60)}...</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span
                                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full text-white ${item.status === 'approved'
                                        ? 'bg-green-500'
                                        : item.status === 'rejected'
                                            ? 'bg-red-500'
                                            : 'bg-yellow-500'
                                    }`}
                            >
                                {item.status}
                            </span>
                        </div>
                        <div className="mt-4 flex flex-col gap-2">
                            <button
                                onClick={() => handleStatusUpdate(item._id, 'approved')}
                                disabled={item.status === 'approved'}
                                className="btn btn-success btn-sm w-full"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleStatusUpdate(item._id, 'rejected')}
                                disabled={item.status === 'rejected'}
                                className="btn btn-error btn-sm w-full"
                            >
                                Reject
                            </button>
                            <button
                                disabled={item.status === 'rejected'}
                                className="btn btn-info btn-sm w-full"
                            >
                                Progress
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto mt-6">
                <table className="table w-full text-sm">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Posted By</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((item) => (
                            <tr key={item._id}>
                                <td className="font-semibold">{item.title}</td>
                                <td>
                                    <img src={item.image} alt="Class" className="w-16 h-16 rounded object-cover" />
                                </td>
                                <td>{item.email}</td>
                                <td>{item.description?.slice(0, 60)}...</td>
                                <td>
                                    <span
                                        className={`px-2 py-1 rounded text-white text-xs ${item.status === 'approved'
                                                ? 'bg-green-500'
                                                : item.status === 'rejected'
                                                    ? 'bg-red-500'
                                                    : 'bg-yellow-500'
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex items-center justify-center gap-2 flex-wrap">
                                        <button
                                            onClick={() => handleStatusUpdate(item._id, 'approved')}
                                            disabled={item.status === 'approved'}
                                            className="btn btn-success btn-xs"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(item._id, 'rejected')}
                                            disabled={item.status === 'rejected'}
                                            className="btn btn-error btn-xs"
                                        >
                                            Reject
                                        </button>
                                        <button
                                            className="btn btn-info btn-xs"
                                            disabled={item.status === 'rejected'}
                                        >
                                            Progress
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllClasses;
