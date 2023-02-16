import axios from 'axios';
import { AUTH } from '@/apis/_constant';

import { store } from '@/store';

import { tryLogout } from '@/common/actions/auth.action';

import instance from './index';

const CancelToken = axios.CancelToken;

let _source = CancelToken.source();

function getRefetchToken() {
    return window.localStorage.getItem(process.env.REACT_APP_STORE_REFRESH_TOKEN);
}

// cancel token
export function cancel(message = null) {
    _source.cancel(message);

    setTimeout(() => (_source = CancelToken.source()), 50);
}

// fetch: method = get
export async function get(url, options = {}) {
    try {
        return await instance.get(url, {
            ...options,
            cancelToken: _source.token,
        });
    } catch (err) {
        return err;
    }
}

// fetch: method = post
export async function post(url, body, options = {}) {
    try {
        return await instance.post(url, body, {
            ...options,
            cancelToken: _source.token,
        });
    } catch (err) {
        return err;
    }
}

// fetch: method = put
export async function put(url, body, options = {}) {
    try {
        return await instance.put(url, body, {
            ...options,
            cancelToken: _source.token,
        });
    } catch (err) {
        return err;
    }
}

// fetch: method = delete
export async function remove(url, options = {}) {
    try {
        return await instance.delete(url, {
            ...options,
            cancelToken: _source.token,
        });
    } catch (err) {
        return err;
    }
}

// fetch: refresh Token
export async function refresh() {
    return post(AUTH.REFETCH_TOKEN, {
        [process.env.REACT_APP_AXIOS_REFRESH_TOKEN_HEADER]: getRefetchToken(),
    });
}

export async function logout() {
    cancel();
    await store.dispatch(tryLogout());
}
