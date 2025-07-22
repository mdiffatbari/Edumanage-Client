import { useEffect, useState } from 'react';
import axios from 'axios';

const AllClassesOne = () => {
  const [approvedClasses, setApprovedClasses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/classes/approved')
      .then(res => setApprovedClasses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto py-40">
      <h2 className="text-3xl font-bold text-center mb-8">All Classes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvedClasses.map(cls => (
          <div
            key={cls._id}
            className="bg-white shadow rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={cls.image}
              alt={cls.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-2">{cls.title}</h3>
              <p className="text-sm text-gray-500 mb-1">By: {cls.name}</p>
              <p className="text-gray-700 mb-2 text-sm">{cls.description?.slice(0, 100)}...</p>
              <div className="mt-auto">
                <p className="text-lg font-semibold text-green-600">৳ {cls.price}</p>
                <p className="text-sm text-gray-600">Total Enrolled: {cls.enrolled || 0}</p>
                <button className="mt-3 w-full btn bg-[#cb3f02] text-white btn-sm">Enroll</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClassesOne;
