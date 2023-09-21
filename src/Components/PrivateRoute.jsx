import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from './Context/AuthContext';
import Home from "./Home";

const PrivateRoute = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  if (!currentUser) {
      navigate('/');
    }
  })

  return (
    <>
      <Outlet />
      <Home />
    </>
  );
};

export default PrivateRoute;
