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
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Teacher Requests</h2>
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
              <td><img src={req.image} alt="user" className="w-12 h-12 rounded-full" /></td>
              <td>{req.experience}</td>
              <td>{req.title}</td>
              <td>{req.category}</td>
              <td>{req.status}</td>
              <td className="space-x-2">
                <button
                  className="btn btn-sm btn-success"
                  disabled={req.status === 'approved' || req.status === 'rejected'}
                  onClick={() => handleStatusChange(req._id, req.email, 'approved')}
                >Approve</button>
                <button
                  className="btn btn-sm btn-error"
                  disabled={req.status === 'rejected'}
                  onClick={() => handleStatusChange(req._id, req.email, 'rejected')}
                >Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherRequest;