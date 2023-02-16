import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
// import subscribeActionMiddleware from "redux-subscribe-action";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import rootReducer from "@/common/reducers";

import { toggleLoading } from "@/common/actions/config.action";

const initialState = {};

const middleware = [thunk /*subscribeActionMiddleware*/];

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [],
  stateReconciler: autoMergeLevel2,
};

const modules = {};

const reducers = persistReducer(
  persistConfig,
  combineReducers({
    ...rootReducer,
    modules,
  })
);

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()) ||
      compose
  )
);

const persistor = persistStore(store);

window.loading = (isLoading = false) => {
  store.dispatch(toggleLoading(isLoading));
};

export { store, persistor };
