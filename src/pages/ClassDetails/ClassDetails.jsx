import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ClassDetails = () => {
  const { id } = useParams();
  const [cls, setCls] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/classes/${id}`)
      .then(res => setCls(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!cls) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
        
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={cls.image}
            alt={cls.title}
            className="w-full h-72 md:h-full object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 p-6 bg-[#00262b] text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">{cls.title}</h2>
            <p className="mb-2"><strong>Teacher:</strong> {cls.name}</p>
            <p className="mb-2"><strong>Email:</strong> {cls.email}</p>
            <p className="mb-4 text-gray-200">{cls.description}</p>
          </div>
          
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-2xl font-bold text-[#cb3f02]">৳ {cls.price}</p>
            <button className="btn bg-[#cb3f02] text-white hover:bg-[#b03601] transition px-6 py-2 rounded-md w-full sm:w-auto">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
