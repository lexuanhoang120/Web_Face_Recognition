import { map } from '@/utils/axios';
import { USER } from './_constant';

export const getAll = (q,p) => {
    return map().get(`${USER.GET}?q=${q}&page=${p}&limit=${10}`);
};