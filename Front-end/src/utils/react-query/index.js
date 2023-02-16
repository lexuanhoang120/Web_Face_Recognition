import { QueryClient } from 'react-query';

const client = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            retryDelay: 0,
            refetchOnWindowFocus: false,
            cacheTime: 0,
            staleTime: 0,
        },
    },
});

function set(key, data, options) {
    return client.setQueryData(key, data, options);
}

function get(key, filter) {
    return client.getQueryData(key, filter);
}

function refetch(key) {
    return client.invalidateQueries(key);
}

import createQuery from './createQuery';

export default client;

export { createQuery, set, get, refetch };
