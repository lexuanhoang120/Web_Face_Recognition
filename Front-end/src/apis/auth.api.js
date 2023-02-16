import { map, post } from '@/utils/axios';
import { AUTH } from './_constant';

export const login = (username, password) => {
    return map().post(AUTH.LOGIN, {
        username,
        password,
    });
};

export const profile = () => {
    return map((res) => res?.data).get(AUTH.PROFILE);
};

export const logout = () => {
    return post(AUTH.LOGOUT);
};
