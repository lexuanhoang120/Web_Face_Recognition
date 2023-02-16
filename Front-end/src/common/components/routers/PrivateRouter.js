import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { createSelector } from "reselect";
import React from "react";
const selectAuth = createSelector(
  (state) => state.auth,
  ({ isLogined }) => ({ isLogined })
);

const PrivateRoute = ({ children }) => {
  const { isLogined } = useSelector(selectAuth);
  return isLogined ? children : <Navigate to={"/login"} />;
};

export default PrivateRoute;
