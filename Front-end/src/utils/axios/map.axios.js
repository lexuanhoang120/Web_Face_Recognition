import { get, post, put, remove } from './request.axios';

export const map = (cb = (data) => data, _default = null) => ({
    get: async (...params) => cb((await get(...params)) || _default),
    post: async (...params) => cb((await post(...params)) || _default),
    put: async (...params) => cb((await put(...params)) || _default),
    remove: async (...params) => cb((await remove(...params)) || _default),
});
