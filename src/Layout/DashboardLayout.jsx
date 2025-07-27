import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';

const DashboardLayout = () => {
  const { role } = useContext(AuthContext);

  const activeLink =
    'bg-[#cb3f02] text-white rounded-md px-4 py-2 transition duration-200';
  const normalLink =
    'hover:bg-[#cb3f02] hover:text-white rounded-md px-4 py-2 transition duration-200';

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-6">
        <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button lg:hidden mb-4">
          Open Menu
        </label>
        <Outlet />
      </div>

      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-[#00262b] text-white space-y-2">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>

          {/* Admin Links */}
          {role === 'admin' && (
            <>
              <li><NavLink to="/dashboard/teacher-request" className={({ isActive }) => isActive ? activeLink : normalLink}>Teacher Requests</NavLink></li>
              <li><NavLink to="/dashboard/users" className={({ isActive }) => isActive ? activeLink : normalLink}>Users</NavLink></li>
              <li><NavLink to="/dashboard/all-classes" className={({ isActive }) => isActive ? activeLink : normalLink}>All Classes</NavLink></li>
            </>
          )}

          {/* Teacher Links */}
          {role === 'teacher' && (
            <>
              <li><NavLink to="/dashboard/add-class" className={({ isActive }) => isActive ? activeLink : normalLink}>Add Class</NavLink></li>
              <li><NavLink to="/dashboard/my-class" className={({ isActive }) => isActive ? activeLink : normalLink}>My Classes</NavLink></li>
            </>
          )}

          {/* Student Links */}
          {role === 'student' && (
            <li><NavLink to="/dashboard/my-enroll-classes" className={({ isActive }) => isActive ? activeLink : normalLink}>My Enroll Classes</NavLink></li>
          )}

          {/* Common Links */}
          <li><NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? activeLink : normalLink}>Profile</NavLink></li>
          <li><NavLink to="/" className={({ isActive }) => isActive ? activeLink : normalLink}>Back To Home</NavLink></li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
