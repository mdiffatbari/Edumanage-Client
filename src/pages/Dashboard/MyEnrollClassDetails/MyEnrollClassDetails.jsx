import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const MyEnrollClassDetails = () => {
  const { classId } = useParams(); // Extract classId from route
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submissionData, setSubmissionData] = useState({});

  useEffect(() => {
    if (!classId) return;

    const fetchAssignments = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/assignments/${classId}`);
        setAssignments(res.data);
      } catch (err) {
        console.error("Error fetching assignments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [classId]);

  // Handle input changes
  const handleInputChange = (id, value) => {
    setSubmissionData(prev => ({ ...prev, [id]: value }));
  };

  // Handle assignment submission
  const handleSubmit = async (assignmentId) => {
    const submission = submissionData[assignmentId];
    if (!submission) {
      alert('Please enter your submission text or link.');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:3000/assignments/${assignmentId}/submit`, {
        classId,
        submissionText: submission,
      });

      alert('Assignment submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Submission failed. Try again.');
    }

    setSubmissionData(prev => ({ ...prev, [assignmentId]: '' }));
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Class Assignments</h1>
      <p className="text-sm text-gray-500 mb-4">Class ID: {classId}</p>

      {loading ? (
        <p>Loading assignments...</p>
      ) : assignments.length === 0 ? (
        <p className="text-red-500">No assignments found for this class.</p>
      ) : (
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Deadline</th>
              <th className="p-2 text-left">Submission</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id} className="border-t">
                <td className="p-2 font-medium">{assignment.title}</td>
                <td className="p-2">{assignment.description}</td>
                <td className="p-2 text-sm text-gray-600">{assignment.deadline}</td>
                <td className="p-2">
                  <input
                    type="text"
                    value={submissionData[assignment._id] || ''}
                    onChange={(e) => handleInputChange(assignment._id, e.target.value)}
                    placeholder="Enter your submission link or answer"
                    className="input input-bordered w-full max-w-xs"
                  />
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleSubmit(assignment._id)}
                    className="btn btn-sm bg-[#cb3f02] text-white hover:bg-[#a73401]"
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyEnrollClassDetails;
