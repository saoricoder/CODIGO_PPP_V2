import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { CircularProgress, Box, Typography } from '@mui/material';
import * as authService from '../services/authServices';

const PrivateRoute = ({ element: Element, allowedRoles, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await authService.verifyToken();
        if (response.isValid === true) {
          setIsAuthenticated(true);
          setUserRole(response.data.rol);
        } else {
          authService.logout();
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" style={{ marginTop: 20 }}>
          Cargando...
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/accessdenied" replace />;
  }

  if (allowedRoles.includes(userRole)) {
    return <Element {...rest} />;
  } else {
    return <Navigate to="/accessdenied" replace />;
  }
};

export default PrivateRoute;