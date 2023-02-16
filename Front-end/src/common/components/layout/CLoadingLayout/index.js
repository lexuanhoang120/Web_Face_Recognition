import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material";

const CLoadingLayout = () => {
  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          bgcolor: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}
      >
        <CircularProgress />
      </Backdrop>
    </div>
  );
};
export default CLoadingLayout;
