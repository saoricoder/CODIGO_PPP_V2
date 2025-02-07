import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
} from "@mui/material";
import {
  LockOutlined as LockIcon,
  DeleteOutline as DeleteIcon,
  SettingsOutlined as SettingsIcon,
} from "@mui/icons-material";
import Drawer from "../../../components/Drawer";
import NavbarAdmin from "../../../components/NavbarAdmin";

const Configuracion = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDeleteAccount = async () => {
    // Implementar lógica para eliminar cuenta
    setOpenDeleteDialog(false);
  };

  const handleChangePassword = async () => {
    // Implementar lógica para cambiar contraseña
    setOpenPasswordDialog(false);
  };

  const configOptions = [
    {
      title: "Cambiar contraseña",
      icon: <LockIcon />,
      action: () => setOpenPasswordDialog(true),
    },
    {
      title: "Eliminar cuenta",
      icon: <DeleteIcon />,
      action: () => setOpenDeleteDialog(true),
      color: "error",
    },
    {
      title: "Preferencias de notificación",
      icon: <SettingsIcon />,
      action: () => {/* Implementar lógica para preferencias de notificación */},
    },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f5f5" }}>
      <NavbarAdmin onDrawerToggle={handleDrawerToggle} />
      <Drawer open={drawerOpen} onClose={handleDrawerToggle} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, overflow: "auto" }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" component="h1" fontWeight="bold" mb={3}>
              Configuración de la cuenta
            </Typography>
            <List>
              {configOptions.map((option, index) => (
                <ListItem key={index} divider={index !== configOptions.length - 1}>
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.title} />
                  {option.switch ? (
                    <Switch
                      edge="end"
                      onChange={option.action}
                    />
                  ) : (
                    <Button
                      variant="outlined"
                      color={option.color || "primary"}
                      onClick={option.action}
                    >
                      {option.title}
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          </Paper>
        </Container>
      </Box>

      {/* Diálogo para eliminar cuenta */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmar eliminación de cuenta</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleDeleteAccount} color="error">
            Eliminar Cuenta
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para cambiar contraseña */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Cambiar contraseña</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="current-password"
            label="Contraseña actual"
            type="password"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="new-password"
            label="Nueva contraseña"
            type="password"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="confirm-password"
            label="Confirmar nueva contraseña"
            type="password"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancelar</Button>
          <Button onClick={handleChangePassword} color="primary">
            Cambiar Contraseña
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Configuracion;