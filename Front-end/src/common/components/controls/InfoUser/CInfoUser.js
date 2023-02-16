import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Fade,
  Avatar,
  Typography,
  Box,
} from "@mui/material";

import {
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
} from "@mui/icons-material";

import avartar from "@/common/assets/images/avatar.png";

import { logout } from "@/utils/axios/request.axios";
import { createSelector } from "reselect";
import { getProfile } from "@/common/actions/auth.action";
import { useSelector, useDispatch } from "react-redux";
const selectData = createSelector(
  (state) => state.auth,
  ({ user }) => ({ user })
);

function CInfoUser() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [realName, setRealName] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = useCallback(async (event) => {
    event.preventDefault();

    await logout();
  }, []);

  const getProfileInfo = async () => {
    try {
      const res = await dispatch(getProfile());
      setRealName(res.payload.username);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <div className="info-user">
      <Button
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="info-user__wrap__user"
      >
        <Avatar className="info-user__avatar" alt="Remy Sharp" src={avartar} />
        <Box className="info-user__user">
          <Typography
            className="info-user__user__name"
            variant="p"
            component="div"
            gutterBottom
          >
            {realName && realName}
          </Typography>
        </Box>
        <Box className="info-user__toggle">
          {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Box>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default CInfoUser;
