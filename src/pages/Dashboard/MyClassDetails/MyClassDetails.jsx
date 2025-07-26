import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const MyClassDetails = () => {
    const { id } = useParams();
    const [classInfo, setClassInfo] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [assignment, setAssignment] = useState({
        title: '',
        deadline: '',
        description: ''
    });
    const [assignmentCount, setAssignmentCount] = useState(0);
    const [enrollmentCount, setEnrollmentCount] = useState(0);

    useEffect(() => {
        // Fetch class info
        axios.get(`http://localhost:3000/classes/${id}`)
            .then(res => setClassInfo(res.data))
            .catch(err => {
                console.error(err);
                Swal.fire('Error', 'Failed to load class details.', 'error');
            });

        // Fetch assignment count
        axios.get(`http://localhost:3000/assignments/${id}`)
            .then(res => setAssignmentCount(res.data.length))
            .catch(err => console.error('Assignment fetch error', err));

        // Fetch enrollment count
        axios.get(`http://localhost:3000/enrolled?classId=${id}`)
            .then(res => setEnrollmentCount(res.data.length))
            .catch(err => console.error('Enrollment fetch error', err));


    }, [id]);

    const handleAssignmentChange = (e) => {
        const { name, value } = e.target;
        setAssignment(prev => ({ ...prev, [name]: value }));
    };

    const handleAddAssignment = async () => {
        if (!assignment.title || !assignment.deadline || !assignment.description) {
            Swal.fire('Error', 'All fields are required.', 'error');
            return;
        }

        try {
            await axios.post(`http://localhost:3000/classes/${id}/assignments`, assignment);

            // Refresh assignment count
            const res = await axios.get(`http://localhost:3000/assignments/${id}`);
            setAssignmentCount(res.data.length);

            setAssignment({ title: '', deadline: '', description: '' });
            setShowModal(false);
            Swal.fire('Success', 'Assignment added successfully!', 'success');
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Failed to add assignment.', 'error');
        }
    };

    if (!classInfo) return <div className="text-center py-10">Loading class details...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Class Progress</h1>

            {/* Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="card bg-base-100 shadow-md p-4 border">
                    <h2 className="text-xl font-semibold mb-2">Total Enrolled</h2>
                    <p className="text-3xl font-bold">{enrollmentCount}</p>
                </div>

                <div className="card bg-base-100 shadow-md p-4 border">
                    <h2 className="text-xl font-semibold mb-2">Total Assignments</h2>
                    <p className="text-3xl font-bold">{assignmentCount}</p>
                </div>

                <div className="card bg-base-100 shadow-md p-4 border">
                    <h2 className="text-xl font-semibold mb-2">Total Submissions</h2>
                    <p className="text-3xl font-bold">0</p>
                </div>
            </div>

            {/* Assignment Section */}
            <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Class Assignments</h2>
                    <button className="btn bg-[#cb3f02] text-white" onClick={() => setShowModal(true)}>
                        Create Assignment
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <dialog open className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Add Assignment</h3>

                        <input
                            type="text"
                            name="title"
                            placeholder="Assignment Title"
                            className="input input-bordered w-full mb-3"
                            value={assignment.title}
                            onChange={handleAssignmentChange}
                        />

                        <input
                            type="date"
                            name="deadline"
                            className="input input-bordered w-full mb-3"
                            value={assignment.deadline}
                            onChange={handleAssignmentChange}
                        />

                        <textarea
                            name="description"
                            placeholder="Assignment Description"
                            className="textarea textarea-bordered w-full mb-3"
                            value={assignment.description}
                            onChange={handleAssignmentChange}
                        />

                        <div className="modal-action flex justify-end gap-2">
                            <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn bg-[#cb3f02] text-white" onClick={handleAddAssignment}>Add Assignment</button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default MyClassDetails;
