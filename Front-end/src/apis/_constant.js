//#region AUTH
export const AUTH = {
  LOGIN: "/auth/login",
  PROFILE: "/auth/me",
  REFETCH_TOKEN: "/auth/renew-token",
  LOGOUT: "/auth/logout",
};
//#endregion

//#region USER
export const USER = {
  GET: "/users",
};
//#endregion

//#region FACERECOGNITION LIST
export const FACERECOGNITION_LIST = {
  GET: "/face_recognition/list_information/",
  GET_BY_ID: "/face_recognition/list_information/",
  POST: "/face_recognition/list_information/",
  POST_IMAGE: "/face_recognition/list_information/detect/",
  PUT: "/face_recognition/list_information",
  DELETE: "/face_recognition/list_information/",
  DELETE_IMAGE: "/face_recognition/list_information/detect/delete",
};
//#endregion

//#region FACERECOGNITION LIST_STORAGE
export const FACERECOGNITION_LIST_STORAGE = {
  GET: "/face_recognition/list_storage/",
  GET_BY_ID: "/face_recognition/list_storage/",
  POST: "/face_recognition/list_storage",
  PUT: "/face_recognition/list_storage",
  DELETE: "/face_recognition/list_storage",
};
//#endregion
