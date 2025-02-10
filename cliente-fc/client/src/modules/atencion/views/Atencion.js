import React, { useEffect, useState, useCallback } from "react";
import {
  Grid,
  Box,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
  Alert,
} from "@mui/material";
import NavbarAdmin from "../../../components/NavbarAdmin";
import Drawer from "../../../components/Drawer";
import CuadroPaciente from "../components/CuadroPaciente";
import CuadroSignosVitales from "../components/CuadroSignosVitales";
import { getPaciente } from "../../../services/pacientesServices";
import {
  getLastSignosVitales,
  getAtenciones,
} from "../../../services/atencion";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import AtencionButton from "../components/AtencionButton";
import CuadroAtenciones from "../components/CuadroAtenciones";
import { usePacienteContext } from "../../../components/base/PacienteContext";
import ExamenesTabView from "../components/ExamenesTabView";
import {
  createAuditoria,
  detalle_data,
} from "../../../services/auditoriaServices";

const Atencion = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { selectedPaciente } = usePacienteContext();
  const [ultimosSignosVitales, setUltimosSignosVitales] = useState(null);
  const [value, setValue] = useState("1");
  const [atenciones, setAtenciones] = useState([]);
  const [isFirstAttention, setIsFirstAttention] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const resetData = useCallback(() => {
    setUltimosSignosVitales(null);
    setAtenciones([]);
  }, []);

  const fetchData = useCallback(async () => {
    if (selectedPaciente) {
      try {
        console.log("Fetching data for paciente:", selectedPaciente);
        const pacienteData = await getPaciente(selectedPaciente);
        if (pacienteData && pacienteData.id_paciente) {
          const atencionesData = await getAtenciones(selectedPaciente);
          //creacion de auditoria
          let data_auditoria = {};
          data_auditoria.id_usuario = pacienteData.id_paciente;
          data_auditoria.modulo = "Atencion";
          data_auditoria.operacion = "Consultar";
          data_auditoria.detalle = detalle_data(data_auditoria).selectTodoSql;
          createAuditoria(data_auditoria);
          if (atencionesData.length === 0) {
            setIsFirstAttention(true);
          } else {
            setIsFirstAttention(false);
          }
          setAtenciones(atencionesData);
          const signosVitalesData = await getLastSignosVitales(
            pacienteData.id_paciente
          );
          setUltimosSignosVitales(signosVitalesData);
        } else {
          console.error("Datos de paciente no válidos");
          resetData();
        }
      } catch (error) {
        console.error(
          "Error al obtener datos del paciente o signos vitales:",
          error
        );
        resetData();
      }
    } else {
      setIsFirstAttention(false);
      resetData();
    }
  }, [selectedPaciente, resetData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavbarAdmin onDrawerToggle={handleDrawerToggle} />
      <Drawer open={drawerOpen} onClose={handleDrawerToggle} />
      <Box
        component="main"
        sx={{ flexGrow: 1, overflowX: "auto", flexDirection: "column" }}
      >
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "space-between",
            mt: { xs: 8, sm: 10 },
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <Grid item xs={12} md={6} sx={{ paddingLeft: 2 }}>
              <CuadroPaciente isDeleteDisable={true} />
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: 2,
              }}
            >
              <AtencionButton
                selectedPaciente={selectedPaciente}
                isFirstAttention={isFirstAttention}
              />
            </Grid>
          </Grid>
          <TabContext value={value}>
            <Box
              sx={{ borderBottom: 1, borderColor: "divider", mt: 1 }}
              justifyContent="center"
              width="100%"
            >
              <Tabs
                centered={!isMobile}
                value={value}
                onChange={handleChange}
                aria-label="consulta tabs"
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons="auto"
                allowScrollButtonsMobile
              >
                <Tab
                  label="Consultas Realizadas"
                  value="1"
                  sx={{
                    color: "#00000099",
                    backgroundColor: "#FFFFFF",
                    "&.Mui-selected": {
                      backgroundColor: "#F3F4F6",
                      color: "#000000",
                    },
                    textTransform: "none",
                  }}
                />
                <Tab
                  label="Información General"
                  value="2"
                  sx={{
                    color: "#00000099",
                    backgroundColor: "#FFFFFF",
                    "&.Mui-selected": {
                      backgroundColor: "#F3F4F6",
                      color: "#000000",
                    },
                    textTransform: "none",
                  }}
                />
                <Tab
                  label="Exámenes"
                  value="3"
                  sx={{
                    color: "#00000099",
                    backgroundColor: "#FFFFFF",
                    "&.Mui-selected": {
                      backgroundColor: "#F3F4F6",
                      color: "#000000",
                    },
                    textTransform: "none",
                  }}
                />
              </Tabs>
            </Box>

            <TabPanel value="1">
              <CuadroAtenciones
                selectedPaciente={selectedPaciente}
                atenciones={atenciones}
              />
            </TabPanel>

            <TabPanel value="2">
              {selectedPaciente ? (
                <CuadroSignosVitales
                  ultimosSignosVitales={ultimosSignosVitales}
                />
              ) : (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Seleccione Paciente para ver información
                </Alert>
              )}
            </TabPanel>
            <TabPanel value="3">
              <ExamenesTabView />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default Atencion;
