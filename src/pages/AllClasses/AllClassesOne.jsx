import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const AllClassesOne = () => {
  const [approvedClasses, setApprovedClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [priceInput, setPriceInput] = useState('');

  useEffect(() => {
    axios.get('https://edumanage-server-virid.vercel.app/classes/approved')
      .then(res => {
        setApprovedClasses(res.data);
        setFilteredClasses(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    if (!priceInput) {
      setFilteredClasses(approvedClasses);
    } else {
      const maxPrice = parseFloat(priceInput);
      setFilteredClasses(approvedClasses.filter(cls => cls.price <= maxPrice));
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto py-40">
      <h2 className="text-3xl font-bold text-center mb-8">All Classes</h2>

      {/* Price Filter Form */}
      <form onSubmit={handleFilterSubmit} className="flex justify-center mb-6 gap-2">
        <input
          type="number"
          placeholder="Enter max price"
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#cb3f02]"
        />
        <button
          type="submit"
          className="bg-[#cb3f02] text-white px-4 py-2 rounded hover:bg-[#e65016] transition"
        >
          Submit
        </button>
      </form>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map(cls => (
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
                <Link to={`/class/${cls._id}`}>
                  <button className="mt-3 w-full btn bg-[#cb3f02] text-white btn-sm">Enroll</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllClassesOne;
