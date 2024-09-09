import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Col, Row } from "react-bootstrap";
import Sidebar from "../pages/AdminPages/components/Sidebar";
import ToastMessage from "../common/component/ToastMessage";
import { loginWithToken } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom"; 

const AdminAppLayout = ({ children }) => {

  const location = useLocation();
  const dispatch = useDispatch();  
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      <ToastMessage />
      <Row className="vh-100">
        <Col xs={12} md={3} className="sidebar mobile-sidebar">
          <Sidebar />
        </Col>
        <Col xs={12} md={9}>
          {children}
        </Col>
      </Row>
      <Outlet></Outlet>
    </div>
  );
};

export default AdminAppLayout;
