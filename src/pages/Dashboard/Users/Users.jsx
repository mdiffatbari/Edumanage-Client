import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(res => {
        setUsers(res.data);
        setFilteredUsers(res.data);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = users.filter(user =>
      user.name?.toLowerCase().includes(value) ||
      user.email?.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  const makeAdmin = (email) => {
    axios.patch(`http://localhost:3000/users/admin`, { email })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          const updatedUsers = users.map(user =>
            user.email === email ? { ...user, role: 'admin' } : user
          );
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);
        }
      });
  };

  return (
    <div className="p-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={handleSearch}
        className="input input-bordered mb-4 w-full md:max-w-md"
      />

      {/* Mobile View - Cards */}
      <div className="md:hidden space-y-4 pr-3">
        {filteredUsers.map((user, index) => (
          <div key={index} className="bg-white border rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-4 mb-3">
              <div className="avatar">
                <div className="w-14 rounded-full">
                  <img src={user.photo || 'https://i.ibb.co/yP9F3wB/blank-avatar.png'} alt="user avatar" />
                </div>
              </div>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="text-sm mb-3">
              <span className="font-medium">Role:</span> {user.role}
            </div>

            <button
              onClick={() => makeAdmin(user.email)}
              disabled={user.role === 'admin'}
              className="btn btn-sm btn-primary w-full"
            >
              {user.role === 'admin' ? 'Admin' : 'Make Admin'}
            </button>
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={user.photo || 'https://i.ibb.co/yP9F3wB/blank-avatar.png'} alt="user avatar" />
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    onClick={() => makeAdmin(user.email)}
                    disabled={user.role === 'admin'}
                    className="btn btn-sm btn-primary"
                  >
                    {user.role === 'admin' ? 'Admin' : 'Make Admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
