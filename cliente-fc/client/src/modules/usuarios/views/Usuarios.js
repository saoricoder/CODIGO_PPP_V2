import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Card, CardHeader, CardContent } from '@mui/material';
import NavbarAdmin from "../../../components/NavbarAdmin";
import Drawer from "../../../components/Drawer";
import ModalAddUsuario from '../components/ModalAddUsuario';
import TablaUsuario from '../components/TablaUsuarios';
import SearchIcon from '@mui/icons-material/Search';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../../../services/usuarioServices'

export default function Usuarios() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('nombre_usuario');
  const [sortDirection, setSortDirection] = useState('asc')
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsuarios();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching users');
      setLoading(false);
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleEdit = async (updatedUser) => {
    try {
      const response = await updateUsuario(updatedUser.id_usuario, updatedUser);
      if (response) {
        setUsers(users.map(u => u.id_usuario === updatedUser.id_usuario ? updatedUser : u));
      } else {
        setError('Error updating user');
      }
    } catch (err) {
      setError('Error updating user');
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      const createdUser = await createUsuario(newUser);
      if (createdUser) {
        setUsers([...users, createdUser]);
        handleCloseModal();
      } else {
        setError('Error creating user');
      }
    } catch (err) {
      setError('Error creating user');
    }
  };

  const handleActivate = async (user) => {
    try {
      const updatedUser = { ...user, estado_usuario: !user.estado_usuario };
      const response = await updateUsuario(user.id_usuario, updatedUser);
      if (response) {
        setUsers(users.map(u => u.id_usuario === user.id_usuario ? updatedUser : u));
      } else {
        setError('Error updating user status');
      }
    } catch (err) {
      setError('Error updating user status');
    }
  };

  const handleDelete = async (user) => {
    try {
      await deleteUsuario(user.id_usuario);
      setUsers(users.filter(u => u.id_usuario !== user.id_usuario));
    } catch (err) {
      setError('Error deleting user');
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  return (
    <Box sx={{ display: "flex" }}>
      <NavbarAdmin onDrawerToggle={handleDrawerToggle} />
      <Drawer open={drawerOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginTop: 7, overflowX: 'auto' }}
      >
        <Card>
          <CardHeader
            title={<Typography variant="h5">Usuarios</Typography>}
            subheader="Gestión de usuarios de la aplicación."
          />
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: 400 }}>
                <SearchIcon style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }} />
                <TextField
                  type="text"
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={handleSearch}
                  variant="outlined"
                  fullWidth
                  style={{ paddingLeft: 40 }}
                />
              </div>
              <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Agregar usuario
              </Button>
            </div>
            {loading ? (
              <Typography>Loading...</Typography>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
<TablaUsuario
        users={users}
        searchTerm={searchTerm}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        handleSort={handleSort}
        handleEdit={handleEdit}
        handleActivate={handleActivate}
        handleDelete={handleDelete}
        handlePageChange={handlePageChange}
        handleItemsPerPageChange={handleItemsPerPageChange}

      />
            )}
          </CardContent>
        </Card>
        <ModalAddUsuario 
        open={modalOpen} 
        onClose={handleCloseModal} 
        onAddUser={handleAddUser} 
        existingUsers={users}
      />
      </Box>
    </Box>
  );
}