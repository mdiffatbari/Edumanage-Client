import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const MyEnrollClassDetails = () => {
  const { id } = useParams(); // classId
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState({}); // track inputs

  useEffect(() => {
    axios.get(`http://localhost:3000/assignments/${id}`)
      .then(res => setAssignments(res.data))
      .catch(err => console.error('Failed to fetch assignments:', err));
  }, [id]);

  const handleChange = (e, assignmentId) => {
    setSubmissions(prev => ({ ...prev, [assignmentId]: e.target.value }));
  };

  const handleSubmit = async (assignmentId) => {
    const submissionText = submissions[assignmentId];
    if (!submissionText) return Swal.fire('Error', 'Please enter your submission first.', 'error');

    try {
      await axios.post(`http://localhost:3000/assignments/${assignmentId}/submit`, {
        content: submissionText,
        studentEmail: 'student@example.com' // Replace with actual user email if available
      });

      // Update local submission count (optional UI improvement)
      setAssignments(prev =>
        prev.map(a =>
          a._id === assignmentId ? { ...a, submissions: (a.submissions || 0) + 1 } : a
        )
      );

      setSubmissions(prev => ({ ...prev, [assignmentId]: '' }));
      Swal.fire('Success', 'Assignment submitted successfully!', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Submission failed.', 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Assignments{id}</h1>

      {assignments.length === 0 ? (
        <p>No assignments available for this class.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Deadline</th>
                <th>Submission</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map(assignment => (
                <tr key={assignment._id}>
                  <td>{assignment.title}</td>
                  <td>{assignment.description}</td>
                  <td>{assignment.deadline}</td>
                  <td className="flex flex-col gap-2">
                    <textarea
                      value={submissions[assignment._id] || ''}
                      onChange={(e) => handleChange(e, assignment._id)}
                      className="textarea textarea-bordered w-full"
                      placeholder="Write your answer..."
                    />
                    <button
                      onClick={() => handleSubmit(assignment._id)}
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyEnrollClassDetails;
