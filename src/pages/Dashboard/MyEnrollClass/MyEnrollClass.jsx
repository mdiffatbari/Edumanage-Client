import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import axios from 'axios';

const MyEnrollClass = () => {
  const { user } = useContext(AuthContext);
  const [enrolledClasses, setEnrolledClasses] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:3000/enrolled?email=${user.email}`)
        .then(res => setEnrolledClasses(res.data))
        .catch(err => console.error('Failed to fetch enrolled classes:', err));
    }
  }, [user]);

  return (
    <div className="py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">My Enrolled Classes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {enrolledClasses.map((cls) => (
          <div key={cls._id} className="bg-white shadow-md rounded-lg overflow-hidden border">
            <img src={cls.image} alt={cls.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{cls.title}</h2>
              <p className="text-gray-600 mb-4">Instructor: {cls.name}</p>
              <button className="bg-[#cb3f02] hover:bg-[#a63401] text-white py-2 px-4 rounded-md">
                Continue
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyEnrollClass;
