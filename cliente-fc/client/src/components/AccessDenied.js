import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="sm">
      <Paper 
        elevation={3} 
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <LockIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
        <Typography component="h1" variant="h5" gutterBottom>
          Acceso Denegado
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Lo sentimos, no tienes permiso para acceder a esta página.
        </Typography>
        <Box mt={3}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/')}
          >
            Volver a la página principal
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AccessDenied;