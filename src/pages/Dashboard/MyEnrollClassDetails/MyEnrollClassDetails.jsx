import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const MyEnrollClassDetails = () => {
  const { classId } = useParams(); // from route /dashboard/myenroll-class/:id
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Class Assignments</h1>
      <p className="text-sm text-gray-500 mb-4">Class ID: {classId}</p>

      {loading ? (
        <p>Loading assignments...</p>
      ) : assignments.length === 0 ? (
        <p className="text-red-500">No assignments found for this class.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {assignments.map((assignment) => (
            <div key={assignment._id} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{assignment.title}</h2>
              <p className="text-sm text-gray-600 mb-2">Deadline: {assignment.deadline}</p>
              <p className="text-gray-700">{assignment.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrollClassDetails;
