import React from 'react';
import { Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { ErrorOutline as ErrorOutlineIcon, Home as HomeIcon } from '@mui/icons-material';

const Error404 = () => {
  return (
    <Container
      maxWidth="md"
      style={{
        height: '100vh', // Establece la altura al 100% de la altura de la ventana
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box textAlign="center">
        <Typography variant="h2" component="div" gutterBottom>
          <ErrorOutlineIcon fontSize="inherit" color="error" /> Error 404
        </Typography>
        <Typography variant="h4" component="div" gutterBottom>
          Página no encontrada
        </Typography>
        <Typography variant="body1" paragraph>
          Lo sentimos, la página que estás buscando no existe.
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          <HomeIcon /> Ir a la página de inicio
        </Button>
      </Box>
    </Container>
  );
};

export default Error404;
