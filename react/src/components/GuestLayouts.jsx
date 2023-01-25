import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

const GuestLayouts = () => {

const {token} = useStateContext()

  if (token){
    return <Navigate to="/users"/>
  }

  return (
    <div >
      <Outlet/>
    </div>
  );
};

export default GuestLayouts;
