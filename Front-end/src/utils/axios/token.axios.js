import _instance from '.';

export function setAuthToken(token) {
    if (token) {
        _instance.defaults.headers[
            process.env.REACT_APP_AXIOS_TOKEN_HEADER
        ] = `Bearer ${token}`;
    } else
        delete _instance.defaults.headers.common[
            process.env.REACT_APP_AXIOS_TOKEN_HEADER
        ];
}
