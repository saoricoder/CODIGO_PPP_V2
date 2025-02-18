import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
  Tooltip,
  IconButton,
  InputAdornment,

  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Drawer from "../../../components/Drawer";
import { useNavigate } from "react-router-dom";
import { getAuditorias } from "../../../services/auditoriaServices";
import AuditoriasTable from "./auditoriaTable";

const VerAuditorias = () => {
  const [auditorias, setAuditorias] = useState([]);
  const [filteredAuditorias, setFilteredAuditorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuditorias = async () => {
      setLoading(true);
      try {
        const data = await getAuditorias();
        setAuditorias(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener auditorías:", error);
        setAuditorias([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAuditorias();
  }, []);

  const handleClearFilters = () => {
    setFilterDate("");
    setFilterUser("");
    setFilteredAuditorias([]);
  };

  const handleApplyFilters = () => {
    const filtered = auditorias.filter((auditoria) => {
      const dateMatch = !filterDate || 
        (auditoria.fecha && auditoria.fecha.includes(filterDate));
      
      const userMatch = !filterUser || 
        (auditoria.id_usuario && 
         auditoria.id_usuario.toString().toLowerCase().includes(filterUser.toLowerCase()));
      
      return dateMatch && userMatch;
    });
    setFilteredAuditorias(filtered);
  };

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
  const handleGoBack = () => navigate("/fcc-auditoria");

  return (
    <Box sx={{ display: "flex" }}>
      <Tooltip title="Menú de navegación principal">
        <span>
          {" "}
          {/* Contenedor para asegurar que el Tooltip pueda manejar ref correctamente */}
          <NavbarAdmin onDrawerToggle={handleDrawerToggle} />
        </span>
      </Tooltip>

      <Tooltip title="Menú lateral con opciones adicionales">
        <span>
          {" "}
          {/* Agregando contenedor también aquí */}
          <Drawer open={drawerOpen} onClose={handleDrawerToggle} />
        </span>
      </Tooltip>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          marginTop: 7,
          overflowX: "auto",
        }}
      >
        <Container>
          <Box display="flex" alignItems="center" mb={2}>
            <IconButton onClick={handleGoBack} color="primary" sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Gestión de Auditorías
            </Typography>
          </Box>

          <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 4 }}>
            <CardHeader
              title="Filtros de Búsqueda"
              avatar={<FilterListIcon color="primary" />}
            />
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Fecha"
                    type="date"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Usuario"
                    size="small"
                    value={filterUser}
                    onChange={(e) => setFilterUser(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleApplyFilters}
                    sx={{ height: 45, fontWeight: "bold" }}
                  >
                    Aplicar Filtros
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={handleClearFilters}
                    sx={{ height: 45 }}
                  >
                    Limpiar Filtros
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardHeader
              title="Registros de Auditoría"
              subheader={`${auditorias.length} resultados encontrados`}
            />
            <CardContent>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                  <CircularProgress size={50} color="primary" />
                </Box>
              ) : (filteredAuditorias.length > 0 || auditorias.length > 0) ? (
                <AuditoriasTable
                  auditorias={filteredAuditorias.length > 0 ? filteredAuditorias : auditorias}
                  onEditAuditoria={(id) => navigate(`/editar-auditoria/${id}`)}
                />
              ) : (
                <Typography
                  sx={{ textAlign: "center", py: 4, color: "text.secondary" }}
                >
                  No se encontraron auditorías con los filtros aplicados.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default VerAuditorias;
