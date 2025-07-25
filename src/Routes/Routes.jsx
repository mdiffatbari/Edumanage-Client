import React from 'react';
import {
  createBrowserRouter,
} from "react-router";
import Root from '../pages/Root/Root';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Home from '../pages/Home/Home';
import LogIn from '../pages/LogIn/LogIn';
import Register from '../pages/Register/Register';
import AuthLayout from '../Layout/AuthLayout';
import TeachOn from '../pages/TeachOn/TeachOn';
import DashboardLayout from '../Layout/DashboardLayout';
import TeacherRequest from '../pages/Dashboard/TeacherRequest/TeacherRequest';
import Users from '../pages/Dashboard/Users/Users';
import AllClasses from '../pages/Dashboard/AllClasses/AllClasses';
import Profile from '../pages/Dashboard/Profile/Profile';
import AddClass from '../pages/Dashboard/AddClass/AddClass';
import MyClass from '../pages/Dashboard/MyClass/MyClass';
import AllClassesOne from '../pages/AllClasses/AllClassesOne';
import ClassDetails from '../pages/ClassDetails/ClassDetails';
import Payment from '../pages/Payment/Payment';
import MyEnrollClass from '../pages/Dashboard/MyEnrollClass/MyEnrollClass';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            index: true,
            path: "/",
            Component: Home
        },
        {
          path: "/teach-on",
          Component: TeachOn
        },
        {
          path: "/all-classes",
          Component: AllClassesOne
        },
        {
          path: "/class/:id",
          Component: ClassDetails
        },
        {
          path: "/payment/:id",
          Component: Payment
        }
        
    ]
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: LogIn
      },
      {
        path: "/auth/register",
        Component: Register
      }
    ]
  },
  {
     path: "/dashboard",
     Component: DashboardLayout,
     children: [
      {
        path: "/dashboard/teacher-request",
        Component: TeacherRequest
      },
      {
        path: "/dashboard/users",
        Component: Users
      },
      {
        path: "/dashboard/all-classes",
        Component: AllClasses
      },
      {
        path: "/dashboard/profile",
        Component: Profile
      },
      {
        path: "/dashboard/add-class",
        Component: AddClass
      },
      {
        path: "/dashboard/my-class",
        Component: MyClass
      },
      {
        path: "/dashboard/my-enroll-classes",
        Component: MyEnrollClass
      }
     ]
  }
]);