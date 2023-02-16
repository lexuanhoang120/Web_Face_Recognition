import React, { memo } from "react";
import { MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";
import { FormControl, FormHelperText } from "@mui/material";

const CSelect = memo(
  ({
    id,
    className,
    name,
    value,
    options,
    onChange,
    sx,
    multiple,
    variant,
    displayValue,
    defaultValue,
    error,
    errorText,
    yup,
  }) => {
    return (
      <FormControl>
        <Select
          className={variant === "SelectModal" ? variant : className}
          id={id}
          name={name}
          error={error}
          sx={sx}
          multiple={multiple}
          {...yup}
          value={value}
          onChange={onChange}
        >
          <MenuItem value={-1}>{defaultValue}</MenuItem>
          {options?.length > 0 &&
            options.map((option) => (
              <MenuItem
                value={option.id ?? option._id}
                key={option.id ?? option._id}
              >
                {option[displayValue]}
              </MenuItem>
            ))}
        </Select>
        {error && (
          <FormHelperText htmlFor="form-selector" error={!!error}>
            {errorText}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

CSelect.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  sx: PropTypes.object,
  multiple: PropTypes.bool,
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  displayValue: PropTypes.string,
};
CSelect.defaultProps = {
  displayValue: "name",
  error: false,
};

export default CSelect;
