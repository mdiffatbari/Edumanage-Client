import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router';

const MyEnrollClass = () => {
  const { user } = useContext(AuthContext);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://edumanage-server-virid.vercel.app/enrolled?email=${user.email}`)
        .then(res => setEnrolledClasses(res.data))
        .catch(err => console.error('Failed to fetch enrolled classes:', err));
    }
  }, [user]);

  const handleContinue = (id) => {
    navigate(`/dashboard/myenroll-class/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {enrolledClasses.length === 0 ? (
        <p>No enrolled classes found.</p>
      ) : (
        enrolledClasses.map((cls) => {
          const classInfo = cls.classDetails;
          return (
            <div key={cls._id} className="bg-white shadow-md rounded-lg overflow-hidden border">
              <img src={classInfo.image} alt={classInfo.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{classInfo.title}</h2>
                <p className="text-gray-600 mb-4">Instructor: {classInfo.name}</p>
                <button
                  className="bg-[#cb3f02] hover:bg-[#a63401] text-white py-2 px-4 rounded-md"
                  onClick={() => handleContinue(classInfo._id)}
                >
                  Continue
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyEnrollClass;
