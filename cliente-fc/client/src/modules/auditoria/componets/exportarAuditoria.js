import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  CircularProgress,
  Card,
  CardContent,
  Container,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Drawer from "../../../components/Drawer";
import { useNavigate } from "react-router-dom";
import { getAuditorias } from "../../../services/auditoriaServices";
import { generarPDF } from "../../../components/pdfGeneradorAuditoria";

const ExportarAuditorias = () => {
  const [auditorias, setAuditorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuditorias = async () => {
      setLoading(true);
      try {
        const data = await getAuditorias();
        setAuditorias(data);
      } catch (error) {
        console.error("Error al obtener auditorías:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuditorias();
  }, []);

  const handleExport = () => {
    const filteredAuditorias = auditorias.filter((auditoria) => {
      const fechaAuditoria = new Date(auditoria.fecha);
      const start = startDate ? new Date(startDate + 'T00:00:00') : null;
      const end = endDate ? new Date(endDate + 'T23:59:59') : null;

      if (start && end) {
        return fechaAuditoria >= start && fechaAuditoria <= end;
      } else if (start) {
        return fechaAuditoria >= start;
      } else if (end) {
        return fechaAuditoria <= end;
      }
      return true;
    });

    console.log('Sample fecha:', filteredAuditorias[0]?.fecha);
        const dataForPDF = filteredAuditorias.map((auditoria) => ({
      id: auditoria.id_auditoria,
      fecha: formatDate(auditoria.fecha),
      modulo: auditoria.modulo,
      usuario: auditoria.usuario,
      operacion: auditoria.operacion,
      detalle: auditoria.detalle,
    }));

    generarPDF(dataForPDF, "Reporte de Auditorías");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const handleGoBack = () => navigate("/fcc-auditoria");

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

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
              Exportar Auditorías
            </Typography>
          </Box>

          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Fecha Inicio"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Fecha Fin"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleExport}
                    disabled={loading}
                    sx={{
                      height: "40px",
                      textTransform: "none",
                      fontSize: "1rem",
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Exportar Auditorías"
                    )}
                  </Button>
                </Grid>
              </Grid>
              <Typography
                variant="body2"
                sx={{
                  mt: 3,
                  color: "text.secondary",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                Selecciona un rango de fechas para exportar las auditorías. Si
                no seleccionas fechas, se exportarán todas las auditorías
                disponibles.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default ExportarAuditorias;
