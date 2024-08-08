import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";

interface DataItem {
  date: string;
  e95: string | null;
  e98: string | null;
}

interface BasicTableProps {
  data: DataItem[] | null;
}

export default function BasicTable({ data }: BasicTableProps) {

  if (!data) {
    return (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>E95</TableCell>
                <TableCell>E98</TableCell>
                <TableCell>Diesel</TableCell>
                <TableCell>Liquid Gas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data available
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
    );
  }

  return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>E95</TableCell>
              <TableCell>E98</TableCell>
              <TableCell>Diesel</TableCell>
              <TableCell>Liquid Gas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((dataItem) => (
                <TableRow key={dataItem.date}>
                  <TableCell component="th" scope="row">
                    {dataItem.date}
                  </TableCell>
                  <TableCell>{dataItem.e95 ?? 'N/A'}</TableCell>
                  <TableCell>{dataItem.e98 ?? 'N/A'}</TableCell>
                  <TableCell>N/A</TableCell>
                  <TableCell>N/A</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}

