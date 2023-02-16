import { Typography } from "@mui/material";
import React from "react";

function CLabel({ children, id }) {
  return (
    <Typography
      id={id}
      className="label"
      variant="h2"
      gutterBottom
      component="div"
    >
      {children ? children : "Fill in label"}
    </Typography>
  );
}

export default CLabel;
