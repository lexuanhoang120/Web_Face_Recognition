import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { REDUCER, ACTION } from "@/common/constants/redux";

const initialState = {
  isLoading: null,
};

const persistConfig = {
  key: REDUCER.CONFIG,
  storage: storage,
  whitelist: ["tabs"],
};

function configReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ACTION.SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
}

export default persistReducer(persistConfig, configReducer);
