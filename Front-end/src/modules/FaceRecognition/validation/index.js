import * as yup from "yup";

const formValidate = yup.object({
  avatar1: yup
    .string()
    .test(
      "checkavatar1",
      "Vui lòng tải lên ít nhất 1 hình",
      (value, context) => {
        const { parent } = context;
        if (value && !value.includes("fakepath")) return true;
        if (parent.avatar2 && !parent.avatar2.includes("fakepath")) return true;
        if (parent.avatar3 && !parent.avatar3.includes("fakepath")) return true;
        if (parent.avatar4 && !parent.avatar4.includes("fakepath")) return true;
        if (parent.avatar5 && !parent.avatar5.includes("fakepath")) return true;
      }
    ),
  avatar2: yup
    .string()
    .test(
      "checkavatar2",
      "Vui lòng tải lên ít nhất 1 hình",
      (value, context) => {
        const { parent } = context;
        if (value && !value.includes("fakepath")) return true;
        if (parent.avatar1 && !parent.avatar1.includes("fakepath")) return true;
        if (parent.avatar3 && !parent.avatar3.includes("fakepath")) return true;
        if (parent.avatar4 && !parent.avatar4.includes("fakepath")) return true;
        if (parent.avatar5 && !parent.avatar5.includes("fakepath")) return true;
      }
    ),
  avatar3: yup
    .string()
    .test(
      "checkavatar3",
      "Vui lòng tải lên ít nhất 1 hình",
      (value, context) => {
        const { parent } = context;
        if (value && !value.includes("fakepath")) return true;
        if (parent.avatar1 && !parent.avatar1.includes("fakepath")) return true;
        if (parent.avatar2 && !parent.avatar2.includes("fakepath")) return true;
        if (parent.avatar4 && !parent.avatar4.includes("fakepath")) return true;
        if (parent.avatar5 && !parent.avatar5.includes("fakepath")) return true;
      }
    ),
  avatar4: yup
    .string()
    .test(
      "checkavatar4",
      "Vui lòng tải lên ít nhất 1 hình",
      (value, context) => {
        const { parent } = context;
        if (value && !value.includes("fakepath")) return true;
        if (parent.avatar1 && !parent.avatar1.includes("fakepath")) return true;
        if (parent.avatar2 && !parent.avatar2.includes("fakepath")) return true;
        if (parent.avatar3 && !parent.avatar3.includes("fakepath")) return true;
        if (parent.avatar5 && !parent.avatar5.includes("fakepath")) return true;
      }
    ),
  avatar5: yup
    .string()
    .test(
      "checkavatar5",
      "Vui lòng tải lên ít nhất 1 hình",
      (value, context) => {
        const { parent } = context;
        if (value && !value.includes("fakepath")) return true;
        if (parent.avatar1 && !parent.avatar1.includes("fakepath")) return true;
        if (parent.avatar2 && !parent.avatar2.includes("fakepath")) return true;
        if (parent.avatar3 && !parent.avatar3.includes("fakepath")) return true;
        if (parent.avatar4 && !parent.avatar4.includes("fakepath")) return true;
      }
    ),
  name: yup.string().required("Vui lòng nhập Name"),
  list_name: yup
    .number()
    .required()
    .min(0, "Vui lòng chọn List")
    .typeError("Vui lòng chọn List"),
  birth_day: yup.number(),
  // .min(0, "Vui lòng chọn Birth Year")
  // .typeError("Vui lòng chọn Birth Year"),
  // .required()
  gender: yup.number(),
  // .required()
  // .min(0, "Vui lòng chọn Gender")
  // .typeError("Vui lòng chọn Gender"),
  description: yup.string(),
  id_delete_image_paths: yup.array(),
});

const faceListValidate = yup.object({
  list_name: yup.string().required("Vui lòng nhập List Name"),
});

export { faceListValidate };
export default formValidate;
