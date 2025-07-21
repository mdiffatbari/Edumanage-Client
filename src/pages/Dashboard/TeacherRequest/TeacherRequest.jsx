import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const TeacherRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/teacher-requests')
      .then(res => setRequests(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleStatusChange = async (id, email, status) => {
    try {
      await axios.patch(`http://localhost:3000/teacher-requests/${id}`, { status, email });
      setRequests(prev => prev.map(r => r._id === id ? { ...r, status } : r));
      Swal.fire('Success', `Request has been ${status}`, 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Something went wrong', 'error');
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4 md:mb-6">Teacher Requests</h2>

      {/*  Mobile Layout (Cards) */}
      <div className="md:hidden space-y-4">
        {requests.map(req => (
          <div key={req._id} className="bg-white shadow-md rounded-lg p-4 border">
            <div className="flex items-center gap-4 mb-2">
              <img src={req.image} alt="user" className="w-14 h-14 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-lg">{req.name}</p>
                <p className="text-sm text-gray-500 capitalize">{req.status}</p>
              </div>
            </div>

            <div className="text-sm mb-3 space-y-1">
              <p><span className="font-semibold">Experience:</span> {req.experience}</p>
              <p><span className="font-semibold">Title:</span> {req.title}</p>
              <p><span className="font-semibold">Category:</span> {req.category}</p>
            </div>

            {/* Vertical Buttons */}
            <div className="flex flex-col gap-2">
              <button
                className="btn btn-sm btn-success w-full"
                disabled={req.status === 'approved' || req.status === 'rejected'}
                onClick={() => handleStatusChange(req._id, req.email, 'approved')}
              >
                Approve
              </button>
              <button
                className="btn btn-sm btn-error w-full"
                disabled={req.status === 'rejected'}
                onClick={() => handleStatusChange(req._id, req.email, 'rejected')}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout (Table) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Experience</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req._id}>
                <td>{req.name}</td>
                <td>
                  <img
                    src={req.image}
                    alt="user"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td>{req.experience}</td>
                <td>{req.title}</td>
                <td>{req.category}</td>
                <td className="capitalize">{req.status}</td>
                <td className="space-x-2 whitespace-nowrap">
                  <button
                    className="btn btn-sm btn-success"
                    disabled={req.status === 'approved' || req.status === 'rejected'}
                    onClick={() => handleStatusChange(req._id, req.email, 'approved')}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    disabled={req.status === 'rejected'}
                    onClick={() => handleStatusChange(req._id, req.email, 'rejected')}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherRequest;
