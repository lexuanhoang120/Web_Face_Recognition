import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Box } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { createImageDetect, removeImageDetect } from "@/apis/face.list.api";
import { SUCCESS, ERROR } from "@/common/constants/message";
import { isSuccess } from "@/utils/func/";
import { noti } from "@/App";
import {
  CInput,
  CForm,
  CUploadImage,
  CLoading,
  CSelect,
  CIconButton,
} from "@/common/components/controls";
import { getAll as getListStorage } from "@/apis/face.list_storage.api";
import { getById } from "@/apis/face.list.api";

function ModalUpdate(props) {
  const {
    id,
    images,
    trigger,
    setImages,
    setValue,
    control,
    errors,
    reset,
    setOpenModal,
    imagesDel,
  } = props;

  //region list storage
  const [listStorage, setListStorage] = useState([]);
  const getAllListStorage = async () => {
    const res = await getListStorage();
    setListStorage(res.data);
  };
  //endregion

  //region backdrop
  const [open, setOpen] = useState(false);
  //endregion

  //region open modal del
  const [openDel, setOpenDel] = useState(false);
  //endregion

  //region array item images
  const [iImages, setIImages] = useState([]);

  //region image path
  const [infoImg, setInfoImg] = useState({
    path: "",
    index: "",
    id: "",
  });
  //endregion

  //region birth years
  const birthYears = [];
  for (let i = 1870; i <= 2100; i++) {
    birthYears.push({ id: i, name: i.toString() });
  }
  //endregion

  //region gender
  const genders = [
    {
      id: 0,
      name: "Male",
    },
    {
      id: 1,
      name: "Female",
    },
  ];
  //endregion

  //region get by id
  const getFaceListById = async () => {
    const res = await getById(id);
    setIImages([]);
    console.log(res);
    reset(res);
    setValue("list_name", res.id_list_name);
    setOpenModal(false);
    setValue("avatar1", res.image_path[0] ? res.image_path[0].image_path : "");
    setValue("avatar2", res.image_path[1] ? res.image_path[1].image_path : "");
    setValue("avatar3", res.image_path[2] ? res.image_path[2].image_path : "");
    setValue("avatar4", res.image_path[3] ? res.image_path[3].image_path : "");
    setValue("avatar5", res.image_path[4] ? res.image_path[4].image_path : "");
    for (let i = 0; i < res.image_path.length; i++) {
      await iImages.push(res.image_path[i]);
    }
    await setIImages(iImages);
  };
  //endregion

  //region arr upload images
  const uploadImages = [
    {
      name: "avatar1",
      errors: !!errors?.avatar1,
      errorText: errors?.avatar1?.name?.message ?? errors?.avatar1?.message,
      onChange: (e) => handleUploadImage(e, 1),
    },
    {
      name: "avatar2",
      errors: !!errors?.avatar2,
      errorText: errors?.avatar2?.name?.message ?? errors?.avatar2?.message,
      onChange: (e) => handleUploadImage(e, 2),
    },
    {
      name: "avatar3",
      errors: !!errors?.avatar3,
      errorText: errors?.avatar3?.name?.message ?? errors?.avatar3?.message,
      onChange: (e) => handleUploadImage(e, 3),
    },
    {
      name: "avatar4",
      errors: !!errors?.avatar4,
      errorText: errors?.avatar4?.name?.message ?? errors?.avatar4?.message,
      onChange: (e) => handleUploadImage(e, 4),
    },
    {
      name: "avatar5",
      errors: !!errors?.avatar5,
      errorText: errors?.avatar5?.name?.message ?? errors?.avatar5?.message,
      onChange: (e) => handleUploadImage(e, 5),
    },
  ];
  //endregion

  //region upload image
  const handleUploadImage = async (e, index) => {
    if (e.target.files.length <= 0) return;
    setOpen(true);
    let imageUpload = new FormData();
    imageUpload.append("file", e.target.files[0]);
    const res = await createImageDetect(imageUpload);
    if (isSuccess(res)) {
      switch (index) {
        case 1:
          setValue("avatar1", res.data.image_face_path);
          images.push(res.data.image_face_path);
          trigger();
          break;
        case 2:
          setValue("avatar2", res.data.image_face_path);
          images.push(res.data.image_face_path);
          trigger();
          break;
        case 3:
          setValue("avatar3", res.data.image_face_path);
          images.push(res.data.image_face_path);
          trigger();
          break;
        case 4:
          setValue("avatar4", res.data.image_face_path);
          images.push(res.data.image_face_path);
          trigger();
          break;
        case 5:
          setValue("avatar5", res.data.image_face_path);
          images.push(res.data.image_face_path);
          trigger();
          break;
        default:
          return;
      }
      noti(SUCCESS.UPLOAD_IMAGE.CREATE, { variant: "success" });
      await setOpen(false);
    } else {
      await setOpen(false);
      noti(res?.message ?? ERROR.UPLOAD_IMAGE.CREATE, { variant: "error" });
    }
  };
  //endregion

  //region open modal delete image
  const handleOpenDeleteImage = (path, index) => {
    setOpenDel(true);
    setInfoImg({ ...infoImg, path: path, index: index });
  };
  //endregion

  //region close modal delete image
  const handleCloseDelete = () => setOpenDel(false);
  //endregion

  //region handle delete image
  const handleDelImage = async (e) => {
    e.preventDefault();
    const hasImages = iImages.findIndex(
      (item) => item.image_path == infoImg.path
    );
    let imageUpload = new FormData();
    imageUpload.append("image_face_path", infoImg.path);
    const res = hasImages === -1 && (await removeImageDetect(imageUpload));
    if (res == false) {
      const itemDel = iImages.find((item) => item.image_path == infoImg.path);
      imagesDel.push(itemDel._id);
      setValue("id_delete_image_paths", imagesDel);
      noti(SUCCESS.UPLOAD_IMAGE.DELETE, { variant: "success" });
      await setOpen(false);
      await handleCloseDelete();
      switch (infoImg.index) {
        case 1:
          setValue("avatar1", undefined);
          trigger();
          break;
        case 2:
          setValue("avatar2", undefined);
          trigger();
          break;
        case 3:
          setValue("avatar3", undefined);
          trigger();
          break;
        case 4:
          setValue("avatar4", undefined);
          trigger();
          break;
        case 5:
          setValue("avatar5", undefined);
          trigger();
          break;
        default:
          return;
      }
    } else if (isSuccess(res)) {
      noti(SUCCESS.UPLOAD_IMAGE.DELETE, { variant: "success" });
      await setOpen(false);
      await handleCloseDelete();
      switch (infoImg.index) {
        case 1:
          setValue("avatar1", undefined);
          setImages(images.filter((item) => item != infoImg.path));
          trigger();
          break;
        case 2:
          setValue("avatar2", undefined);
          setImages(images.filter((item) => item != infoImg.path));
          trigger();
          break;
        case 3:
          setValue("avatar3", undefined);
          setImages(images.filter((item) => item != infoImg.path));
          trigger();
          break;
        case 4:
          setValue("avatar4", undefined);
          setImages(images.filter((item) => item != infoImg.path));
          trigger();
          break;
        case 5:
          setValue("avatar5", undefined);
          setImages(images.filter((item) => item != infoImg.path));
          trigger();
          break;
        default:
          return;
      }
    } else {
      await setOpen(false);
      noti(res?.message ?? ERROR.UPLOAD_IMAGE.DELETE, { variant: "error" });
    }
  };
  //endregion

  useEffect(() => {
    getAllListStorage();
    getFaceListById();
  }, []);

  return (
    <>
      <Box id="info-item" className="info-item cupload_image_list">
        <CLoading open={open}></CLoading>
        {uploadImages.map((item, index) => (
          <Box className="cupload_image_item" key={index}>
            <Controller
              name={item.name}
              control={control}
              render={({ field }) => (
                <>
                  <CUploadImage
                    yup={{ ...field }}
                    onChange={item.onChange}
                    imgUrl={
                      !field?.value?.includes("fakepath")
                        ? field?.value
                        : undefined
                    }
                    error={item.errors}
                    errorText={item.errorText}
                  />
                  {field?.value && !field?.value?.includes("fakepath") && (
                    <Delete
                      className="del-icon"
                      disabled={!!item.imgUrl}
                      onClick={() =>
                        handleOpenDeleteImage(field.value, ++index)
                      }
                    />
                  )}
                </>
              )}
            />
          </Box>
        ))}
      </Box>

      <Box className="info-item__input">
        <p className="nowrap w-20">
          Name<span className="required-input"> *</span>
        </p>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <CInput
              className="face_list_input"
              error={!!errors?.name}
              errorText={errors?.name?.name?.message ?? errors?.name?.message}
              onChange={(event, value) => field.onChange(value)}
              value={field.value ?? ""}
              yup={{ ...field }}
            />
          )}
        />
      </Box>

      <Box className="info-item__input box-select">
        <p className="nowrap w-20">
          List<span className="required-input"> *</span>
        </p>
        <Controller
          name="list_name"
          control={control}
          defaultValue={-1}
          render={({ field }) => (
            <CSelect
              className="face_list_select"
              displayValue="list_name"
              error={!!errors?.list_name}
              errorText={
                errors?.list_name?.name?.message ?? errors?.list_name?.message
              }
              defaultValue="---"
              value={field.value}
              onChange={(event) => {
                field.onChange(event.target.value);
              }}
              options={listStorage}
            />
          )}
        />
      </Box>

      <Box className="info-item__input box-select">
        <p className="nowrap w-20">Birth Year</p>
        <Controller
          name="birth_day"
          control={control}
          defaultValue={-1}
          render={({ field }) => (
            <CSelect
              className="face_list_select"
              error={!!errors?.birth_day}
              errorText={
                errors?.birth_day?.name?.message ?? errors?.birth_day?.message
              }
              defaultValue="---"
              value={field.value}
              onChange={(event) => {
                field.onChange(event.target.value);
              }}
              options={birthYears}
            />
          )}
        />
      </Box>

      <Box className="info-item__input box-select">
        <p className="nowrap w-20">Gender</p>
        <Controller
          name="gender"
          control={control}
          defaultValue={-1}
          render={({ field }) => (
            <CSelect
              className="face_list_select"
              error={!!errors?.gender}
              errorText={
                errors?.gender?.name?.message ?? errors?.gender?.message
              }
              defaultValue="---"
              value={field.value}
              onChange={(event) => {
                field.onChange(event.target.value);
              }}
              options={genders}
            />
          )}
        />
      </Box>

      <Box className="info-item__input">
        <p className="nowrap w-20">Description</p>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <CInput
              className="face_list_input"
              error={!!errors?.description}
              errorText={
                errors?.description?.name?.message ??
                errors?.description?.message
              }
              onChange={(event, value) => field.onChange(value)}
              value={field.value ?? ""}
              yup={{ ...field }}
            />
          )}
        />
      </Box>

      <CForm
        label="Delete Image"
        isOpen={openDel}
        handleCloseModal={handleCloseDelete}
        minWidthForm="617px"
        unsetHeight={true}
        isHiddenAddMuti={true}
        nameAction="Xóa"
        className="manual modal-device"
        onClick={handleDelImage}
      >
        <h4 style={{ fontWeight: 500, fontSize: 20, textAlign: "center" }}>
          Bạn có chắc chắn muốn xóa không?
        </h4>
      </CForm>
    </>
  );
}

export default ModalUpdate;
