import React, { useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "@/common/assets/style/components/pagination.scss";
import {
  Typography,
  Pagination,
  Stack,
  Box,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const CPagination = ({
  handleChangePage,
  page,
  defaultPage,
  total,
  count,
  className,
  pageSize,
  handleChangePageSize,
  handleGoToPage,
  paginationRef,
}) => {
  const valueArr = [
    {
      value: 20,
      name: "20",
    },
    {
      value: 40,
      name: "40",
    },
    {
      value: 50,
      name: "50",
    },
  ];

  const [pageValid, setPageValid] = useState(1);

  useEffect(() => {
    if (page !== 0) {
      setPageValid(page);
    }
  }, [page]);
  return (
    <Box className="pagination_wrap">
      <Box className="pagination_left">
        <Typography
          variant="span"
          component="span"
          className="pagination_total"
        >
          Tất cả {total} dòng
        </Typography>

        <Stack spacing={2}>
          <Pagination
            ref={paginationRef}
            onChange={handleChangePage}
            defaultPage={defaultPage}
            count={count}
            page={pageValid}
            siblingCount={1}
            boundaryCount={1}
            shape="rounded"
            color="primary"
            size="small"
            className={classNames("c-pagination", className)}
          />
        </Stack>
      </Box>

      <Box className="pagination_right">
        <Select
          value={pageSize}
          onChange={handleChangePageSize}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          className="pagination_select"
        >
          {valueArr.map((item) => (
            <MenuItem value={item.value} key={item.value}>
              {item.name} / page
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};
CPagination.propTypes = {
  count: PropTypes.number,
  color: PropTypes.string,
  colsizeor: PropTypes.string,
};
export default CPagination;
