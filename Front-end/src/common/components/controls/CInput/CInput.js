import React, { memo } from "react";
import { TextField, styled } from "@mui/material";

const StyledInput = styled(TextField)(() => ({
  "& input": {
    padding: "11px 10px 10px",
    height: "unset",
    borderRadius: "5px",
    borderRadius: "4.8px",
    border: "1px solid #BCBFC5",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "19px",
  },
}));

const CInput = ({
  id,
  name,
  value,
  placeholder,
  onChange,
  type,
  readOnly,
  error,
  errorText,
  min,
  className,
  yup,
  onKeyDown,
  ...props
}) => {
  return (
    <StyledInput
      onKeyDown={onKeyDown}
      className={className}
      id={id}
      name={name}
      readOnly={readOnly}
      disabled={readOnly}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      error={error}
      helperText={errorText}
      InputProps={{ inputProps: { min: min } }}
      {...yup}
      value={value}
      {...props}
    />
  );
};

CInput.defaultProps = {
  readOnly: false,
  error: false,
};

export default memo(CInput);
