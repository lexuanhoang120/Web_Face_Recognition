import React, { lazy } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

// Start Modules
import Facerecognition from "@/modules/Facerecognition/pages";
// End Modules
import * as routes from "./constant";

const MainLayout = lazy(() => import("@/common/components/layout/MainLayout"));

const routerBuilder = [
  {
    path: "*",
    element: (
      <MainLayout>
        <Routes>
          <Route
            element={<Facerecognition />}
            path={routes.FACERECOGNITION.LIST.path}
          />
        </Routes>
      </MainLayout>
    ),
  },
  {
    path: "/",
    element: <Navigate to={routes.FACERECOGNITION.LIST.path} />,
  },
];

export default routerBuilder;
