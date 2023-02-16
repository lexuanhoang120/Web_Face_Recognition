import { ACTION } from "@/common/constants/redux";
import { login, logout, profile } from "@/apis/auth.api";
import { setAuthToken } from "@/utils/axios";
import { history } from "@/App";
import { isSuccess } from "@/utils/func";

function setAuthenticate(token = null) {
  return {
    type: ACTION.SET_AUTHENTICATE,
    payload: token,
  };
}

export function setUser(user) {
  return {
    type: ACTION.SET_CURRENT_USER,
    payload: user,
  };
}

export function saveToken(accessToken) {
  return async (dispatch) => {
    dispatch(setAuthenticate(accessToken));
  };
}

export function tryLogin({ username, password }) {
  return async (dispatch) => {
    try {
      const res = await login(username, password);

      if (isSuccess(res)) {
        const { access_token } = res.data;

        dispatch(saveToken(access_token));

        setAuthToken(access_token);

        return true;
      }

      return false;
    } catch {
      return false;
    }
  };
}

export function getProfile() {
  return async (dispatch) => {
    const me = await profile();
    return dispatch(setUser(me));
  };
}

export function tryLogout() {
  return async (dispatch) => {
    logout();

    await dispatch(setAuthenticate(null));
    await dispatch(setUser(null));

    history.push("/login");
  };
}
