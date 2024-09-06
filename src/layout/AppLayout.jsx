import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Col, Row } from "react-bootstrap";
// import Sidebar from "../component/Sidebar";
import Navbar from "../common/component/Navbar";
import ToastMessage from "../common/component/ToastMessage";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom"; 

const AppLayout = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = {
    email: "hodoo@gmail.com",
    password: "123",
    name: "하호두",
    level: "admin" 

  };
  
  // const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // dispatch(userActions.loginWithToken());
  }, []);

  return (
    <div>
      <ToastMessage />
      {location.pathname.includes("admin") ? (
        <Row className="vh-100">
          <Col xs={12} md={3} className="sidebar mobile-sidebar">
            {/* <Sidebar /> */}
          </Col>
          <Col xs={12} md={9}>
            {children}
          </Col>
        </Row>
      ) : (
        <>
          <Navbar user={user} />
          {children}
        </>
      )}
      <Outlet></Outlet>
    </div>
  );
};

export default AppLayout;