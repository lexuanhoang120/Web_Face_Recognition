import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import classNames from "classnames";
import Checkbox from "@mui/material/Checkbox";

function CCheckbox({ label, className }) {
  return (
    <FormControlLabel
      className={classNames("c-datepicker", className)}
      control={<Checkbox className="label-checkbox__input" />}
      label={label}
    />
  );
}

export default CCheckbox;
