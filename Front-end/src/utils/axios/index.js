import axios from "axios";

import { FORM_HEADER_JSON } from "./header.axios";

import { refresh, logout } from "./request.axios";

import { saveToken } from "@/common/actions/auth.action";
import { store } from "@/store";
import { setAuthToken } from "./token.axios";

const _timeout = process.env.REACT_APP_AXIOS_TIMEOUT;

const _instance = axios.create({
  baseURL: process.env.REACT_APP_FACERECOGNITION_BASE_URL,
  headers: { ...FORM_HEADER_JSON },
  timeout: _timeout,
});

let isRefetching = false;

const _queue = [];

const handleRefetch = async (response) => {
  if (!isRefetching) {
    isRefetching = true;

    return refresh()
      .then(({ data }) => {
        isRefetching = false;

        const { access_token } = data;

        store.dispatch(saveToken(access_token));

        setAuthToken(access_token);

        _queue.forEach(({ resolve }) => resolve());

        return _instance({
          ...response.config,
          headers: {
            [process.env
              .REACT_APP_AXIOS_TOKEN_HEADER]: `Bearer ${access_token}`,
          },
        });
      })
      .catch((error) => {
        _queue.forEach(({ reject }) => reject(error));

        return Promise.reject(error);
      });
  } else {
    // save to use later when refetching done
    return new Promise((resolve, reject) => _queue.push({ resolve, reject }))
      .then(() => null)
      .catch((error) => Promise.reject(error));
  }
};

_instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

_instance.interceptors.response.use(
  (response) => {
    if (response.status === 205) return handleRefetch(response);

    if (response.data instanceof Blob)
      return { data: response.data, status: response.status };

    return { ...response.data, status: response.status };
  },
  (error) => {
    if (error?.constructor?.name === "Cancel") {
      return error?.message ?? "Cancel";
    }

    if (error?.response?.status === 401) {
      return logout();
    }

    return Promise.reject({
      ...error.response.data,
      status: error.response.status,
    });
  }
);

export default _instance;

export * from "./header.axios";

export * from "./map.axios";

export * from "./request.axios";

export * from "./token.axios";
