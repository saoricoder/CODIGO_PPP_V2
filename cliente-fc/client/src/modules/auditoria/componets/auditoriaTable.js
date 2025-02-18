import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  TableFooter,
  TablePagination,
  Typography,
  Box,
  CardHeader,
  CardContent,
  CircularProgress,
} from "@mui/material";


//import { getAuditorias } from "../../../services/auditoriaServices";

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

const AuditoriasTable = ({ auditorias, loading }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);

  const handleChangePage = ( newPage) => setCurrentPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

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
                  <StyledTableCell>Fecha</StyledTableCell>
                  <StyledTableCell>Usuario</StyledTableCell>
                  <StyledTableCell>Operación</StyledTableCell>
                  <StyledTableCell>Módulo</StyledTableCell>
                  <StyledTableCell>Detalle</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {auditorias.length === 0 ? (
                  <StyledTableRow>
                    <StyledTableCell colSpan={6} align="center">
                      <Typography variant="subtitle1">
                        No hay auditorías disponibles
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                ) : (
                  auditorias
                    .slice(
                      currentPage * itemsPerPage,
                      currentPage * itemsPerPage + itemsPerPage
                    )
                    .map((auditoria) => (
                      <StyledTableRow key={auditoria.id_auditoria}>
                        <StyledTableCell>
                          {new Date(auditoria.fecha).toLocaleString()}
                        </StyledTableCell>
                        <StyledTableCell>{auditoria.id_usuario}</StyledTableCell>
                        <StyledTableCell>{auditoria.operacion}</StyledTableCell>
                        <StyledTableCell>{auditoria.modulo}</StyledTableCell>
                        <StyledTableCell>{auditoria.detalle}</StyledTableCell>
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
                      count={auditorias.length}
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
