import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch popular classes from backend
    axios.get('http://localhost:3000/classes')
      .then(res => {
        setClasses(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch popular classes:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading popular classes...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
      {classes.map(cls => (
        <div key={cls._id} className="border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <img src={cls.image} alt={cls.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-1">{cls.title}</h3>
            <p className="text-sm text-gray-600 mb-2">Instructor: {cls.name}</p>
            <p className="text-sm mb-2">Enrolled: {cls.enrolled}</p>
            <p className="text-sm font-bold">Price: €{cls.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularClasses;
