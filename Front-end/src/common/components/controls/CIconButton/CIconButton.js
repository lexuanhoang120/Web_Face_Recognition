import React from "react";
import { IconButton } from "@mui/material";

import classNames from "classnames";

function CIconButton({
  disabled,
  id,
  btnRef,
  bgColor,
  onOpenModal,
  className,
  children,
}) {
  return (
    <IconButton
      disabled={disabled}
      sx={{
        backgroundColor: bgColor,
        color: "#fff",
      }}
      id={id}
      className={classNames("icon-button", className)}
      aria-label="delete"
      onClick={onOpenModal}
      ref={btnRef}
    >
      {children}
    </IconButton>
  );
}

export default CIconButton;
