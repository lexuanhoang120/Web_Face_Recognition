import { map } from '@/utils/axios';
import { FINANCE } from './_constant';
import { Finance } from '@/common/models/finance';
import { isSuccess } from '@/utils/func/';

export const getAll = (
    params = { page: 1, rowsPerPage: 10, financialYear: '', company: '' }
) => {
    return map(({ data, ...rest }) =>
        isSuccess(rest)
            ? {
                nItems: data.nItems,
                nPages: data.nPages,
                data: data.data,
            }
            : { nItems: 0, nPages: 0, data: [] }
    ).get(
        `${FINANCE.GET}?sType=DESC&page=${params.page}&limit=${params.rowsPerPage}&year=${params.financialYear}&company=${params.company}`
    );
};

export const create = (data) => {
    return map().post(FINANCE.POST, data);
};

export const update = (id, data) => {
    return map().put(`${FINANCE.PUT}/${id}`, data);
};

export const getById = (id) => {
    return map(({ data }) => new Finance(data)).get(`${FINANCE.GET_BY_ID}${id}`);
};

export const remove = (id) => {
    return map().remove(`${FINANCE.DELETE}finances/${id}`);
};

// export const tryUploadFile = (file) => {
//   const form = new FormData();
//   form.append("file", file);
//   return map(({ data, ...res }) => {
//     if (isSuccess(res)) return { ...res, data: new Document(data) };
//     return { ...res };
//   }).post(FINANCE.UPLOAD, form, {
//     headers: FORM_HEADER_FORMDATA,
//   });
// };
