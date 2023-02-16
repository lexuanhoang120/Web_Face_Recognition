import React, { memo } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const CLoading = ({ open, onClick }) => {
  return (
    <Backdrop
      style={{ color: "#fff", zIndex: 99999, position: "fixed" }}
      open={open}
      onClick={onClick}
    >
      <CircularProgress size={100} color="inherit" />
    </Backdrop>
  );
};

CLoading.defaultProps = {
  open: false,
};

export default memo(CLoading);
