import React from "react";
import { Box, Checkbox, TableCell, TableRow } from "@mui/material";

import CTable from "@/common/components/layout/CTable";

//head table
const headCells = [
  {
    name: "Face Image",
  },
  {
    name: "Created Time",
  },
  {
    name: "Name",
  },
  {
    name: "List",
  },
  {
    name: "Birth Year",
  },
  {
    name: "Gender",
  },
  {
    name: "ID",
  },
  {
    name: "Description",
  },
];

const MTable = (props) => {
  const {
    setting,
    selection,
    rows,
    totalRows,
    handleSelectAllClick,
    handleChangePageSize,
    handleChangePage,
    handleClick,
    isSelected,
    paginationRef,
    handleGoToPage,
    ref,
  } = props;
  //download file
  return (
    <CTable
      setting={setting}
      clicked={selection}
      headCells={headCells}
      rows={rows}
      totalRows={totalRows}
      onSelectAllClick={handleSelectAllClick}
      handleChangePage={handleChangePage}
      handleChangePageSize={handleChangePageSize}
      paginationRef={paginationRef}
      ref={ref}
    >
      {rows &&
        rows.map((row, index) => {
          const isItemSelected = isSelected(row._id);
          const labelId = `enhanced-table-checkbox-${index}`;
          return (
            <TableRow
              key={row._id}
              hover
              onClick={(event) => handleClick(event, row, index)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              selected={isItemSelected}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </TableCell>
              <TableCell align="left">
                <img
                  className="face_list_image"
                  src={
                    process.env.REACT_APP_FACERECOGNITION_LIST_INFORMATION +
                    row.image_path
                  }
                  alt="img"
                />
              </TableCell>
              <TableCell align="left">
                <p title={row.created_time}>{row.created_time}</p>
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.list_name}</TableCell>
              <TableCell align="left">
                {row.birth_day == -1 ? "" : row.birth_day}
              </TableCell>
              <TableCell align="left">
                {row.gender == -1 ? "" : row.gender == 0 ? "Male" : "Female"}
              </TableCell>
              <TableCell align="left">{row._id}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
            </TableRow>
          );
        })}
    </CTable>
  );
};

export default MTable;
