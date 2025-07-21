import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/users/${user.email}`)
        .then(res => res.json())
        .then(data => setUserInfo(data));
    }
  }, [user]);

  if (!userInfo) return (
    <div className="flex justify-center items-center h-60">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="relative max-w-4xl mx-auto mt-10 -z-30">
      {/* Banner */}
      <div className="h-48 bg-gradient-to-r from-[#00262b] to-[#cb3f02] rounded-xl shadow-lg flex items-center justify-center text-white text-4xl font-semibold py-12 mb-12">
        Profile
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow-xl rounded-xl -mt-20 p-8 mx-4 md:mx-0 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={userInfo.photo || 'https://via.placeholder.com/150'}
            alt="User"
            className="w-36 h-36 rounded-full object-cover border-4 border-[#cb3f02] shadow-md"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{userInfo.name || 'No Name'}</h2>
            <p className="text-gray-600 mt-1">{userInfo.email}</p>
            <div className="mt-4 space-y-1">
              <p><span className="font-semibold text-gray-700">Phone:</span> {userInfo.phone || '+880 1234567897'}</p>
              <p><span className="font-semibold text-gray-700">Role:</span> <span className="capitalize">{userInfo.role}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
