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
          const updatedUsers = users.map(user => {
            if (user.email === email) return { ...user, role: 'admin' };
            return user;
          });
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);
        }
      });
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={handleSearch}
        className="input input-bordered mb-4 w-full max-w-md"
      />

      <div className="overflow-x-auto">
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