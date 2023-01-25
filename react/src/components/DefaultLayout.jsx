import React, {useEffect} from 'react';
import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios.client.js";

const DefaultLayout = () => {
const {user, token, notification, setUser,setToken} = useStateContext()

  if (!token){
    return <Navigate to="/login"/>
  }

  const onLogout = (ev) => {
    ev.preventDefault()
    axiosClient.post('/logout')
      .then( () => {
        setUser({})
        setToken(null)
      })

  }


  useEffect( () => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      })

  }, [])
  return (
    <div id="defaultLayout">
      <aside>
        <Link to="dashboard">Dashboard</Link>
        <Link to="users">Users</Link>
        <Link to="blogs">Blogs</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>
            {user.name}
            <a href="#" className="btn-logout" onClick={onLogout}>Logout</a>
          </div>

        </header>
        <main>
          <Outlet/>
        </main>
      </div>

      {notification &&
        <div className="notification">
          {notification}
        </div>
      }

    </div>
  );
};

export default DefaultLayout;
