import { map } from "@/utils/axios";
import { FACERECOGNITION_LIST } from "./_constant";
import { FaceRecognitionList } from "@/common/models/faceRecognitionList";
import { isSuccess } from "@/utils/func/";

export const getAll = (params = { page: 1, rowsPerPage: 10 }) => {
  return map(({ data, ...rest }) =>
    isSuccess(rest)
      ? {
          nItems: data.nItems,
          nPages: data.nPages,
          data: data.data,
        }
      : { nItems: 0, nPages: 0, data: [] }
  ).get(
    `${FACERECOGNITION_LIST.GET}?page=${params.page}&rowsPerPage=${params.rowsPerPage}`
  );
};

export const create = (data) => {
  return map().post(FACERECOGNITION_LIST.POST, data);
};

export const createImageDetect = (data) => {
  return map().post(FACERECOGNITION_LIST.POST_IMAGE, data);
};

export const removeImageDetect = (data) => {
  return map().post(`${FACERECOGNITION_LIST.DELETE_IMAGE}`, data);
};

export const update = (id, data) => {
  return map().put(`${FACERECOGNITION_LIST.PUT}/${id}`, data);
};

export const getById = (id) => {
  return map(({ data }) => new FaceRecognitionList(data)).get(
    `${FACERECOGNITION_LIST.GET_BY_ID}${id}`
  );
};

export const remove = (id) => {
  return map().remove(`${FACERECOGNITION_LIST.DELETE}${id}`);
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
