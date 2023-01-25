import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayouts from "./components/GuestLayouts.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UserForm from "./pages/UserForm.jsx";
import Blogs from "./pages/Blogs.jsx";
import BlogForm from "./pages/BlogForm.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to={"/blogs"} />

      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/users/new',
        element: <UserForm key="UserCreate"/>
      },
      {
        path: '/user/:id',
        element: <UserForm key="UserUpdate"/>
      },
      {
        path: '/blogs',
        element: <Blogs/>
      },
      {
        path: '/add-blog',
        element: <BlogForm key="BlogCreate"/>
      },
      {
        path: '/blog/:id',
        element: <BlogForm key="BlogUpdate"/>
      },

    ]
  },
  {
    path: '/',
    element: <GuestLayouts/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      },
    ]
  },


  {
    path: '*',
    element: <NotFound/>
  }

])

export default router;
