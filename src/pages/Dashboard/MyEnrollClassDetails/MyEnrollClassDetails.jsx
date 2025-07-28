import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Rating } from 'react-simple-star-rating';
import useAuthContext from '../../../hooks/useAuthContext';

const MyEnrollClassDetails = () => {
  const { classId } = useParams();
  const { user } = useAuthContext(); // ✅ moved hook to top level
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submissionData, setSubmissionData] = useState({});
  const [submittedAssignments, setSubmittedAssignments] = useState({});

  const [showTERModal, setShowTERModal] = useState(false);
  const [terDescription, setTerDescription] = useState('');
  const [terRating, setTerRating] = useState(0);
  const [terSubmitting, setTerSubmitting] = useState(false);
  const [classTitle, setClassTitle] = useState('');

  useEffect(() => {
    if (!classId) return;

    const fetchAssignments = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/assignments/${classId}`);
        setAssignments(res.data);
      } catch (err) {
        console.error("Error fetching assignments:", err);
        Swal.fire('Error', 'Failed to load assignments.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [classId]);

  useEffect(() => {
    if (!classId) return;

    axios.get(`http://localhost:3000/classes/${classId}`)
      .then(res => setClassTitle(res.data.title))
      .catch(err => console.error('Failed to load class title:', err));
  }, [classId]);

  const handleInputChange = (id, value) => {
    setSubmissionData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (assignmentId) => {
    const submission = submissionData[assignmentId];
    if (!submission) {
      Swal.fire('Error', 'Please enter your submission.', 'error');
      return;
    }

    try {
      await axios.post(`http://localhost:3000/assignments/${assignmentId}/submit`, {
        classId,
        submissionText: submission,
      });

      Swal.fire('Success', 'Assignment submitted successfully!', 'success');

      setSubmittedAssignments(prev => ({ ...prev, [assignmentId]: true }));
      setSubmissionData(prev => ({ ...prev, [assignmentId]: '' }));
    } catch (error) {
      console.error('Submission error:', error);
      Swal.fire('Error', 'Submission failed. Try again.', 'error');
    }
  };

  const openTERModal = () => {
    setTerDescription('');
    setTerRating(0);
    setShowTERModal(true);
  };

  const closeTERModal = () => setShowTERModal(false);

  const handleTERSubmit = async () => {
    if (!terDescription.trim()) {
      Swal.fire('Error', 'Description is required.', 'error');
      return;
    }
    if (terRating === 0) {
      Swal.fire('Error', 'Please provide a rating.', 'error');
      return;
    }

    setTerSubmitting(true);

    try {
      await axios.post('http://localhost:3000/teaching-evaluation', {
        classId,
        classTitle,
        name: user?.displayName || 'Anonymous',
        description: terDescription,
        rating: terRating,
      });

      Swal.fire('Success', 'Teaching Evaluation Report submitted!', 'success');
      setShowTERModal(false);
    } catch (error) {
      console.error('TER submission error:', error);
      Swal.fire('Error', 'Failed to submit report. Try again.', 'error');
    } finally {
      setTerSubmitting(false);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* TER Button */}
      <div className="mb-6">
        <button
          onClick={openTERModal}
          className="btn bg-[#cb3f02] text-white hover:bg-[#a73401]"
        >
          Teaching Evaluation Report
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Class Assignments</h1>

      {loading ? (
        <p>Loading assignments...</p>
      ) : assignments.length === 0 ? (
        <p className="text-red-500">No assignments found for this class.</p>
      ) : (
        <>
          {/* Table for medium and larger screens */}
          <div className="hidden md:block overflow-x-auto">
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
                    <td className="p-2 text-sm text-gray-600">
                      {new Date(assignment.deadline).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={submissionData[assignment._id] || ''}
                        onChange={(e) =>
                          handleInputChange(assignment._id, e.target.value)
                        }
                        placeholder="Enter submission"
                        className="input input-bordered w-full max-w-xs"
                        disabled={submittedAssignments[assignment._id]}
                      />
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleSubmit(assignment._id)}
                        className={`btn btn-sm text-white ${submittedAssignments[assignment._id]
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#cb3f02] hover:bg-[#a73401]'
                          }`}
                        disabled={submittedAssignments[assignment._id]}
                      >
                        {submittedAssignments[assignment._id]
                          ? 'Submitted'
                          : 'Submit'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for small screens */}
          <div className="md:hidden space-y-4">
            {assignments.map((assignment) => (
              <div
                key={assignment._id}
                className="bg-white border rounded-lg p-4 shadow"
              >
                <h3 className="text-lg font-bold mb-1">{assignment.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  Deadline: {new Date(assignment.deadline).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-3">{assignment.description}</p>
                <input
                  type="text"
                  value={submissionData[assignment._id] || ''}
                  onChange={(e) =>
                    handleInputChange(assignment._id, e.target.value)
                  }
                  placeholder="Enter submission"
                  className="input input-bordered w-full mb-2"
                  disabled={submittedAssignments[assignment._id]}
                />
                <button
                  onClick={() => handleSubmit(assignment._id)}
                  className={`btn w-full text-white ${submittedAssignments[assignment._id]
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#cb3f02] hover:bg-[#a73401]'
                    }`}
                  disabled={submittedAssignments[assignment._id]}
                >
                  {submittedAssignments[assignment._id]
                    ? 'Submitted'
                    : 'Submit'}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* TER Modal */}
      {showTERModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg mb-4">Teaching Evaluation Report (TER)</h3>

            <textarea
              placeholder="Description"
              className="textarea textarea-bordered w-full mb-4"
              rows={4}
              value={terDescription}
              onChange={(e) => setTerDescription(e.target.value)}
            />

            <div className="mb-6">
              <label className="block mb-1 font-semibold">Rating:</label>
              <div className="inline-flex gap-1">
                <Rating
                  onClick={setTerRating}
                  ratingValue={terRating * 20}
                  size={30}
                  transition
                  fillColor="#cb3f02"
                  emptyColor="#ccc"
                />
              </div>
            </div>

            <div className="modal-action flex justify-end gap-2">
              <button className="btn btn-outline" onClick={closeTERModal} disabled={terSubmitting}>
                Cancel
              </button>
              <button
                className="btn bg-[#cb3f02] text-white"
                onClick={handleTERSubmit}
                disabled={terSubmitting}
              >
                {terSubmitting ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyEnrollClassDetails;
