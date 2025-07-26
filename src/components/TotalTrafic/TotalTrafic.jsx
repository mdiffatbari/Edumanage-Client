import React, { useEffect, useState } from 'react';
import traffic from "../../assets/traffic.jpg";
import axios from 'axios';

const TotalTrafic = () => {
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userRes, classRes] = await Promise.all([
          axios.get('http://localhost:3000/users'),
          axios.get('http://localhost:3000/classes'),
        ]);
        setUsers(userRes.data);
        setClasses(classRes.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const totalUsers = users.length;
  const totalStudents = users.filter(user => user.role === 'student').length;
  const totalApprovedClasses = classes.filter(cls => cls.status === 'approved').length;

  if (loading) return <p className="text-center py-10">Loading statistics...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 max-w-7xl mx-auto py-32">
      {/* Left Side: Stats Cards */}
      <div className="space-y-4">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-bold mb-2">Total Users</h3>
          <p className="text-3xl font-extrabold text-[#cb3f02]">{totalUsers}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-bold mb-2">Total Classes</h3>
          <p className="text-3xl font-extrabold text-[#cb3f02]">{totalApprovedClasses}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-bold mb-2">Total Students</h3>
          <p className="text-3xl font-extrabold text-[#cb3f02]">{totalStudents}</p>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="w-full">
        <img
          src={traffic}
          alt="Traffic Overview"
          className="w-full h-auto rounded-xl shadow-md object-cover"
        />
      </div>
    </div>
  );
};

export default TotalTrafic;
