import * as React from 'react';
import Box from '@mui/material/Box';
import NavbarAdmin from '../../../components/NavbarAdmin';
import Drawer from '../../../components/Drawer';
import TablaPersonalSalud from '../components/TablaPersonal';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { getPersonalSaludId, deleteLogicalPersonalSalud, getPersonalSalud } from '../../../services/personalsaludServices';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState, useEffect } from 'react';

import BuscarPersonal from '../components/buscarPersonal';
import ModalAddPersonalSalud from '../components/modalAddPersonal';
import ModalEditPersonalSalud from '../components/modalEditPersonal';

const PersonalSalud = () => {
  const [personalsaluds, setPersonalSalud] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPersonal, setSelectedPersonal] = useState(null);
  const [selectedStatePersonal, setSelectedStatePersonal] = useState(null);
  const [idPersonal, setIdPersonal] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({ name: '' });

  useEffect(() => {
    fetchPersonalSalud();
  }, []);

  const fetchPersonalSalud = async () => {
    setIsLoading(true);
    try {
      var data = await getPersonalSalud();
      data.sort((a, b) => a.id_personalsalud - b.id_personalsalud);
      setPersonalSalud(data);
    } catch (error) {
      console.error("Error fetching personal salud:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEdit = async (id) => {
    const personalsalud = await getPersonalSaludId(id);
    setSelectedPersonal(personalsalud);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    setIdPersonal(id);
    const personal = await getPersonalSaludId(id);
    setSelectedStatePersonal(personal.estado_personal);
    handleAlertOpen();
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleCompleteDelete = async () => {
    const id = idPersonal;
    await deleteLogicalPersonalSalud(id);
    fetchPersonalSalud();
    handleAlertClose();
  };

  const handleSearch = (name) => {
    setFilterCriteria({ name });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <NavbarAdmin onDrawerToggle={handleDrawerToggle} />
      <Drawer open={drawerOpen} onClose={handleDrawerToggle} />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginTop: 7, overflowX: 'auto' }}>
        <Container>
          <h1>Lista del Personal de Salud Fundación con Cristo</h1>
        </Container>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2, alignItems: 'center' }}>
          <BuscarPersonal onSearch={handleSearch} />
          <Button onClick={handleModalOpen} variant="contained" color="primary" startIcon={<PersonAddAltIcon />}>
            Personal 
          </Button>
        </Box>
        <TablaPersonalSalud 
          handleEdit={handleEdit} 
          handleDeletePersonalSalud={handleDelete} 
          filterCriteria={filterCriteria} 
          personalsaluds={personalsaluds} 
          isLoading={isLoading}
        />
      </Box>
      <Dialog
        open={alertOpen}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{selectedStatePersonal ? 'Desactivar' : 'Activar'} Personal?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas {selectedStatePersonal ? 'desactivar' : 'activar'} este personal?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} variant="outlined" color="primary">Cancelar</Button>
          <Button onClick={handleCompleteDelete} autoFocus variant="contained" color={selectedStatePersonal ? 'error' : 'success'}>{selectedStatePersonal ? 'Desactivar' : 'Activar'}</Button>
        </DialogActions>
      </Dialog>
      {modalOpen && <ModalAddPersonalSalud open={modalOpen} onClose={handleModalClose} onPersonalSaludAdded={fetchPersonalSalud} />}
      {editModalOpen && <ModalEditPersonalSalud open={editModalOpen} onClose={handleEditModalClose} personalData={selectedPersonal} onPersonalSaludUpdated={fetchPersonalSalud} />}
    </Box>
  );
};

export default PersonalSalud;