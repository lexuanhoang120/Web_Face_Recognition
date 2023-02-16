import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";

const Input = styled(TextField)({
  display: "block",
});

export default function CInputFile({
  error,
  errorText,
  multiple,
  id,
  nameFile,
  onChange,
  inputRef,
  acceptFile,
  yup,
}) {
  return (
    <Box className="upload__file">
      <Input
        inputRef={inputRef}
        helperText={errorText}
        error={error}
        id={id}
        inputProps={{
          multiple: multiple,
          accept: acceptFile,
        }}
        type="file"
        onChange={onChange}
        {...yup}
      />
      <label htmlFor={id}>
        <Box className="upload__file__choose">Choose File</Box>
        <Box className="upload__file__name">{nameFile} </Box>
      </label>
    </Box>
  );
}
CInputFile.defaultProps = {
  error: false,
};
