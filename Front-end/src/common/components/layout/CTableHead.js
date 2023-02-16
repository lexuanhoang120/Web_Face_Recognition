import React from "react";
import PropTypes from "prop-types";
import {
  TableCell,
  TableHead,
  Box,
  IconButton,
  TableRow,
  Checkbox,
} from "@mui/material";
import { South as SouthIcon, North as NorthIcon } from "@mui/icons-material";

function EnhancedTableHead(props) {
  const {
    noCheckbox,
    onSelectAllClick,
    headCells,
    handleFilter,
    isFilter,
    handleFilterName,
    filter,
    clicked,
  } = props;

  return (
    <TableHead sx={{ backgroundColor: "rgba(237,246,251,1)" }}>
      <TableRow>
        {!noCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={clicked}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
        )}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.name}
            align="left"
            sx={{
              color: "#147DB8",
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "130%",
              textTransform: "capitalize",
              whiteSpace: "nowrap",
            }}
          >
            {headCell.name == "thời hạn" ||
            headCell.name == "Kinh nghiệm" ||
            (isFilter && headCell.name == "Họ & tên") ? (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minWidth: 160,
                  maxWidth: 160,
                }}
              >
                <div>{headCell.name}</div>
                {/* handleFilterName */}
                <div
                  style={{ padding: "10px 9px", cursor: "pointer" }}
                  onClick={
                    headCell.name == "Họ & tên"
                      ? handleFilterName
                      : handleFilter
                  }
                >
                  {headCell.name == "thời hạn" ||
                  headCell.name == "Kinh nghiệm" ? (
                    filter == "DESC" ? (
                      <IconButton
                        style={{ transform: "scale(0.7)", color: "#147DB8" }}
                      >
                        <NorthIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        style={{ transform: "scale(0.7)", color: "#147DB8" }}
                      >
                        <SouthIcon />
                      </IconButton>
                    )
                  ) : (
                    <IconButton
                      style={{ transform: "scale(0.7)", color: "#147DB8" }}
                    >
                      <NorthIcon />
                    </IconButton>
                  )}
                </div>
              </Box>
            ) : (
              <div>{headCell.name}</div>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onSelectAllClick: PropTypes.func,
};

export default EnhancedTableHead;
