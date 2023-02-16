import fileDownload from "js-file-download";

import { map } from "@/utils/axios";
import { isSuccess } from "@/utils/func/";

import { EXPORT_FILE } from "./_constant";

import { ERROR, SUCCESS } from "@/common/constants/message";

import { noti } from "@/App";

export const exportFile = ({ ids }) => {
  const body = { ids: ids.map((id) => Number(id)) };
  return map((res) => {
    if (!isSuccess(res)) {
      return noti(res?.message ?? ERROR.EXPORT.EXPORT, { variant: "error" });
    }
    fileDownload(res.data, "report.xlsx");
    return noti(SUCCESS.EXPORT.EXPORT, { variant: "success" });
  }).post(`${EXPORT_FILE.POST}`, body, { responseType: "blob" });
};
