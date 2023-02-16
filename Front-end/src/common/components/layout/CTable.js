import * as React from "react";
import { Box, Table, TableBody, TableContainer, Paper } from "@mui/material";

import CPagination from "../controls/CPagination/CPagination";
import EnhancedTableHead from "./CTableHead";

export default function EnhancedTable(props) {
  const {
    unsetHeight,
    noCheckbox,
    noPagination,
    setting,
    headCells,
    totalRows,
    children,
    onSelectAllClick,
    handleChangePage,
    handleChangePageSize,
    clicked,
    paginationRef,
    page,
    rowsPerPage,
  } = props;
  /**Table */
  const countNum =
    Number(Math.ceil(totalRows / (setting?.rowsPerPage ?? rowsPerPage))) || 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer sx={{ maxHeight: "500px" }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            stickyHeader
          >
            <EnhancedTableHead
              noCheckbox={noCheckbox}
              clicked={clicked}
              onSelectAllClick={onSelectAllClick}
              headCells={headCells}
            />
            <TableBody className={unsetHeight ? "unset-h" : ""}>
              {children}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {!noPagination && (
        <CPagination
          handleChangePage={handleChangePage}
          defaultPage={1}
          page={setting?.page ?? page}
          total={totalRows}
          count={countNum}
          pageSize={setting?.rowsPerPage ?? rowsPerPage}
          handleChangePageSize={handleChangePageSize}
          paginationRef={paginationRef}
        />
      )}
    </Box>
  );
}
