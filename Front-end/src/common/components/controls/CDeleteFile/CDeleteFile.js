import React from "react";
import {
	UploadFileOutlined as UploadFileOutlinedIcon,
	Close as CloseIcon,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { bytesToSize } from "@/utils/func";

const CDeleteFile = ({ label, size, onClick }) => {
	return (
		<Box className="info-deletefile">
			<Box className="info-item__space"></Box>
			<Box className="info-item__info">
				<Box className="info-item__file">
					<UploadFileOutlinedIcon />
				</Box>
				<p className="info-item__label">{label}</p>
				{size && <p className="info-item__size">{bytesToSize(size)}</p>}
				<Box className="info-item__clear" onClick={onClick}>
					<CloseIcon />
				</Box>
			</Box>
		</Box>
	);
};

export default CDeleteFile;
