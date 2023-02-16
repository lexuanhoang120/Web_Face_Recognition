import React from "react";

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

function CListItem(props) {
	return (
		<>
			<ListItemButton
				key={props.text}
				id="list-item"
				className="list-item"
				selected={props.selectedIndex === props.index}
				onClick={(event) => props.handleListItemClick(event, props.index)}
				sx={{
					minHeight: 48,
					justifyContent: props.open ? "initial" : "center",
					px: 2.5,
				}}
			>
				<ListItemIcon
					sx={{
						minWidth: 0,
						mr: props.open ? 3 : "auto",
						justifyContent: "center",
						margin: props.open ? "unset auto unset unset" : "0 auto",
					}}
					className="list-item__icon"
				>
					{props.children}
				</ListItemIcon>
				<ListItemText
					className="list-item__text"
					primary={props.text}
					sx={{ display: props.open ? "block" : "none" }}
				/>
			</ListItemButton>
		</>
	);
}

export default CListItem;
