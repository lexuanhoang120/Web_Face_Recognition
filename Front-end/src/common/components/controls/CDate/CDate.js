import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { Box, FormControl, FormHelperText, TextField } from "@mui/material";

const CDate = ({
  placeholder,
  value,
  onChange,
  onAccept,
  error,
  errorText,
  className,
  position,
  ...props
}) => {
  return (
    <FormControl>
      <Box className={classNames("c-datepicker", className)}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            allowSameDateSelection
            onAccept={onAccept}
            onChange={onChange}
            value={value}
            renderInput={(params) => (
              <TextField
                fullWidth
                {...params}
                inputProps={{
                  ...params.inputProps,
                  placeholder: placeholder,
                }}
              />
            )}
            {...props}
          />
        </LocalizationProvider>
      </Box>
      {error && (
        <FormHelperText
          error={!!error}
          htmlFor="form-selector"
          style={{ position: position ? "absolute" : "unset", bottom: -24 }}
        >
          {errorText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

CDate.propTypes = {
  onChange: PropTypes.func.isRequired,
  inputFormat: PropTypes.string,
};

CDate.defaultProps = {
  error: false,
  inputFormat: "dd/MM/yyyy",
};

export default CDate;
