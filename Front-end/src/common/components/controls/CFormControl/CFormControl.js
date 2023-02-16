import React, { cloneElement, useCallback, useEffect, useState } from "react";
import { Box, FormHelperText } from "@mui/material";

const CFormControl = ({ children, error, errorText, onFormValueChange }) => {
	const [innerValue, setInnerValue] = useState(children.props?.value ?? "");

	useEffect(
		() => setInnerValue(children.props?.value ?? ""),
		[children.props.value]
	);

	const handleChange = useCallback(
		(...params) => {
			const value = onFormValueChange(...params);

			setInnerValue(value);
		},
		[onFormValueChange]
	);

	return (
		<Box className={"c-form-control form-control"}>
			{cloneElement(children, {
				value: innerValue,
				onChange: handleChange,
			})}
			{!!error && errorText && <FormHelperText>{errorText}</FormHelperText>}
		</Box>
	);
};

CFormControl.defaultProps = {
	onFormValueChange: (e) => e?.target?.value,
};

export default CFormControl;
