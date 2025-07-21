import React from 'react';
import { Link, Outlet } from 'react-router';

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content p-6">
        <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button lg:hidden mb-4">
          Open Menu
        </label>
        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-2">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>

          {/* Admin Links */}
          <li><Link to="/dashboard/teacher-request">Teacher Requests</Link></li>
          <li><Link to="/dashboard/users">Users</Link></li>
          <li><Link to="/dashboard/all-classes">All Classes</Link></li>

          {/* Teacher Links */}
          <li><Link to="/dashboard/add-class">Add Class</Link></li>
          <li><Link to="/dashboard/my-classes">My Classes</Link></li>

          {/* Student Links */}
          <li><Link to="/dashboard/my-enroll-classes">My Enroll Classes</Link></li>

          {/* Common Link */}
          <li><Link to="/dashboard/profile">Profile</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
