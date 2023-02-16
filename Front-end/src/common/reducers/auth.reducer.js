import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { REDUCER, ACTION } from "@/common/constants/redux";

const initialState = {
  isLogined: false,
  token: null,
  user: null,
};

const persistConfig = {
  key: REDUCER.AUTH,
  storage: storage,
  whitelist: ["token"],
};

function authReducer(
  state = initialState,
  { type, payload } = { type: null, payload: null }
) {
  switch (type) {
    case ACTION.SET_CURRENT_USER:
      return { ...state, user: payload, isLogined: !!payload };
    case ACTION.SET_AUTHENTICATE:
      return { ...state, token: payload };
    default:
      return state;
  }
}

export default persistReducer(persistConfig, authReducer);
