import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  TableSortLabel,
  TableFooter,
  TablePagination,
  IconButton,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  CardHeader,
  CardContent,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getAuditorias } from "../../../services/auditoriaServices";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const AuditoriasTable = () => {
  const [auditorias, setAuditorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortColumn, setSortColumn] = useState("fecha");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAuditorias, setFilteredAuditorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuditorias = async () => {
      setLoading(true);
      try {
        const data = await getAuditorias();
        setAuditorias(data);
        setFilteredAuditorias(data);
      } catch (error) {
        console.error("Error al obtener auditorías:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuditorias();
  }, []);

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortColumn(column);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = auditorias.filter(
      (auditoria) =>
        auditoria.usuario
          ?.toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        auditoria.operacion
          ?.toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        auditoria.modulo
          ?.toLowerCase()
          .includes(event.target.value.toLowerCase())
    );
    setFilteredAuditorias(filtered);
  };

  const handleChangePage = (event, newPage) => setCurrentPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const sortedAuditorias = filteredAuditorias.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
      <CardHeader
        title={<Typography variant="h5">Auditorías</Typography>}
        subheader="Listado de registros"
      />
      <CardContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <StyledTableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <TableSortLabel
                      active={sortColumn === "fecha"}
                      direction={sortColumn === "fecha" ? sortDirection : "asc"}
                      onClick={() => handleSort("fecha")}
                    >
                      Fecha
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell>Usuario</StyledTableCell>
                  <StyledTableCell>Operación</StyledTableCell>
                  <StyledTableCell>Módulo</StyledTableCell>
                  <StyledTableCell>Detalle</StyledTableCell>
                  {/*<StyledTableCell align="center">Acciones</StyledTableCell>*/}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedAuditorias.length === 0 ? (
                  <StyledTableRow>
                    <StyledTableCell colSpan={6} align="center">
                      <Typography variant="subtitle1">
                        No hay auditorías disponibles
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                ) : (
                  sortedAuditorias
                    .slice(
                      currentPage * itemsPerPage,
                      currentPage * itemsPerPage + itemsPerPage
                    )
                    .map((auditoria) => (
                      <StyledTableRow key={auditoria.id_auditoria}>
                        <StyledTableCell>
                          {new Date(auditoria.fecha).toLocaleString()}
                        </StyledTableCell>
                        <StyledTableCell>{auditoria.usuario}</StyledTableCell>
                        <StyledTableCell>{auditoria.operacion}</StyledTableCell>
                        <StyledTableCell>{auditoria.modulo}</StyledTableCell>
                        <StyledTableCell>{auditoria.detalle}</StyledTableCell>
                        {/*<StyledTableCell align="center">
                          <Tooltip title="Editar Auditoría">
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() =>
                                navigate(
                                  `/editar-auditoria/${auditoria.id_auditoria}`
                                )
                              }
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>*/}
                      </StyledTableRow>
                    ))
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={6}>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={filteredAuditorias.length}
                      rowsPerPage={itemsPerPage}
                      page={currentPage}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </StyledTableContainer>
        )}
      </CardContent>
    </Box>
  );
};

export default AuditoriasTable;
