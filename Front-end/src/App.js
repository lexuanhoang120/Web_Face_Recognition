import React, { useEffect, useLayoutEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createBrowserHistory } from "history";
import { createSelector } from "reselect";
import { useSnackbar } from "notistack";

import LoginLayout from "@/common/components/layout/LoginLayout";
import { CRoutes } from "@/common/components/layout";
import PrivateRoute from "@/common/components/routers/PrivateRouter";
import CustomRouter from "@/common/components/routers/CustomRouter";
import MainLayout from "@/common/components/layout/Main";
import { getProfile } from "@/common/actions/auth.action";
import { logout, setAuthToken } from "@/utils/axios";

const selectData = createSelector(
  (state) => state.config,
  (state) => state.auth,
  ({ isLoading }, { token, isLogined }) => ({ isLoading, token, isLogined })
);
export const history = createBrowserHistory();
export let noti;

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading, isLogined, token } = useSelector(selectData);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    noti = (message, options) =>
      enqueueSnackbar(message, {
        ...options,
        autoHideDuration: 1500,
      });
  });

  useEffect(() => {
    const initFunc = async () => {
      window.loading(true);
      try {
        if (token) {
          await setAuthToken(token);
          await dispatch(getProfile());
        } else {
          logout();
        }
      } catch (err) {
        console.log(err);
      }

      window.loading(false);
    };

    initFunc();
  }, []);
  return (
    <CustomRouter
      history={history}
      layout={<MainLayout isLoading={isLoading} isLogined={isLogined} />}
    >
      <Routes>
        <Route path="/login" element={<LoginLayout />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <React.Suspense fallback={null}>
                <CRoutes />
              </React.Suspense>
            </PrivateRoute>
          }
        />
      </Routes>
    </CustomRouter>
  );
}

export default App;
