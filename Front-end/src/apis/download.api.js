import fileDownload from "js-file-download";

import { map } from "@/utils/axios";
import { isSuccess } from "@/utils/func/";

import { DOWN_FILE } from "./_constant";

import { ERROR, SUCCESS } from "@/common/constants/message";

import { noti } from "@/App";

export const download = (value) => {
  return map((res) => {
    if (!isSuccess(res)) {
      return noti(res?.message ?? ERROR.DOWNLOAD.EXPORT, { variant: "error" });
    }
    fileDownload(res.data, value.split("/")[2]);
    return noti(SUCCESS.DOWNLOAD.EXPORT, { variant: "success" });
  }).get(`${DOWN_FILE.GET}${value}`, { responseType: "blob" });
};
