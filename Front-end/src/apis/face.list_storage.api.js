import { map } from "@/utils/axios";
import { FACERECOGNITION_LIST_STORAGE } from "./_constant";
import { FaceRecognitionListStorage } from "@/common/models/faceRecognitionListStorage";
import { isSuccess } from "@/utils/func/";

export const getAll = () => {
  return map(({ data, ...rest }) =>
    isSuccess(rest)
      ? {
          data: data.data,
        }
      : { data: [] }
  ).get(`${FACERECOGNITION_LIST_STORAGE.GET}`);
};

export const create = (data) => {
  return map().post(FACERECOGNITION_LIST_STORAGE.POST, data);
};

export const update = (id, data) => {
  return map().put(`${FACERECOGNITION_LIST_STORAGE.PUT}/${id}`, data);
};

export const getById = (id) => {
  return map(({ data }) => new FaceRecognitionListStorage(data)).get(
    `${FACERECOGNITION_LIST_STORAGE.GET_BY_ID}${id}`
  );
};

export const remove = (id) => {
  return map().remove(`${FACERECOGNITION_LIST_STORAGE.DELETE}/${id}`);
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
