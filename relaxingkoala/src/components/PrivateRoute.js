import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext); 
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; 
  }

  return user ? ( 
    <Outlet /> 
  ) : (
    <Navigate to="/login" state={{ from: location }} replace /> 
  );
};

export default PrivateRoute;