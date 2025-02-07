import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const ClickableCell = styled(StyledTableCell)(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.primary.main,
  '&:hover': {
    color: theme.palette.primary.dark,
    textDecoration: 'underline',
  },
}));

export const CenteredAvatar = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});