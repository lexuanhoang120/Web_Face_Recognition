import dayjs from "dayjs";
import DiffArray from "./diffArray";

export { DiffArray };

export function isSuccess(response) {
  return response?.status?.toString()[0] === "2";
}

export function bytesToSize(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export const handleCutPath = (path) => {
  let stringAPI = "/api";
  let position = path.indexOf(stringAPI);
  let stringFind = path.slice(position + stringAPI.length, position.length);
  return stringFind;
};

export const addCommas = (nStr) => {
  nStr += "";
  let x = nStr.split(".");
  let x1 = x[0];
  let x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
};

export const plusDay = (date, amount) => {
  return (date = dayjs(date).add(amount, "day"));
};

export const subtractDay = (date, amount) => {
  return (date = dayjs(date).subtract(amount, "day"));
};
