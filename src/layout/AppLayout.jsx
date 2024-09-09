import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Col, Row } from "react-bootstrap";
// import Sidebar from "../component/Sidebar";
import Navbar from "../common/component/Navbar";
import ToastMessage from "../common/component/ToastMessage";
import { loginWithToken } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom"; 

const AppLayout = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();  
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      <ToastMessage />

      
        <>
          <Navbar user={user} />
          {children}
        </>

      <Outlet></Outlet>
    </div>
  );
};

export default AppLayout;