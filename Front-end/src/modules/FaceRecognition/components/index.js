import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { isSuccess } from "@/utils/func/";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { noti } from "@/App";
import CForm from "@/common/components/controls/CForm/CForm";
import CIconButton from "@/common/components/controls/CIconButton/CIconButton";
import { SUCCESS, ERROR } from "@/common/constants/message";
import CLoading from "@/common/components/controls/CLoading/CLoading";
import ModalList from "./List/List";
import ModalAdd from "./ModalAdd";
import ModalUpdate from "./ModalUpdate";
import initialValues from "../initialValues";
import formValidate from "../validation";
import { AddIcon, DeleteIcon, UpdateIcon } from "@/modules/_assets/icons/index";
import {
  create,
  update,
  remove,
  removeImageDetect,
} from "@/apis/face.list.api";
import CButton from "@/common/components/controls/CButton/CButton";

function ModalDetail({ selectCheckbox, getFaceList, setSelectCheckbox }) {
  const {
    setValue,
    trigger,
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({
    mode: "onChange",
    initialValues,
    resolver: yupResolver(formValidate),
  });

  const updateBtnRef = useRef(null);
  const deleteBtnRef = useRef(null);

  // Backdrop
  const [open, setOpen] = useState(false);

  //region open/close modal add
  const [openModal, setOpenModal] = useState({
    modalAdd: false,
    modalUpdate: false,
    modalDel: false,
    modalList: false,
  });
  //endregion

  //region list images
  const [images, setImages] = useState([]);
  //endregion

  //region list images delete
  const [imagesDel, setImagesDel] = useState([]);
  //endregion

  //region open/close modal list
  const handleOpenList = () => {
    setOpenModal({ ...openModal, modalList: true });
    clearErrors();
    reset({});
  };
  const handleCloseList = () =>
    setOpenModal({ ...openModal, modalList: false });
  //endregion

  //region open/close modal add
  const handleOpenAdd = () => {
    setOpenModal({ ...openModal, modalAdd: true });
    clearErrors();
    reset({});
  };
  const handleCloseAdd = async () => {
    setImagesDel([]);
    setOpenModal({ ...openModal, modalAdd: false });
    for (let i = 0; i < images.length; i++) {
      if (images[i]) {
        let imageDel = new FormData();
        imageDel.append("image_face_path", images[i]);
        await removeImageDetect(imageDel);
      }
    }
  };
  //endregion

  //region open/close modal update
  const handleOpenUpdate = () => {
    if (selectCheckbox.length === 1) {
      setOpenModal({ ...openModal, modalUpdate: true });
      setOpen(true);
      clearErrors();
      reset({});
    }
  };
  const handleCloseUpdate = async () => {
    setOpenModal({ ...openModal, modalUpdate: false });
    setImagesDel([]);
    for (let i = 0; i < images.length; i++) {
      if (images[i]) {
        let imageDel = new FormData();
        imageDel.append("image_face_path", images[i]);
        await removeImageDetect(imageDel);
      }
    }
  };
  //endregion

  //region open/close modal delete
  const handleOpenDelete = () => {
    if (selectCheckbox.length === 1) {
      setOpenModal({ ...openModal, modalDel: true });
    }
  };
  const handleCloseDelete = () =>
    setOpenModal({ ...openModal, modalDel: false });
  //endregion

  //region handle delete list information
  const handleDeleteList = async (e) => {
    e.preventDefault();
    const res = await remove(selectCheckbox[0]);
    if (isSuccess(res)) {
      noti(SUCCESS.FACE_RECOGNITION_LIST_INFOMATION.DELETE, {
        variant: "success",
      });
      getFaceList();
      handleCloseDelete();
      selectCheckbox.length = 0;
      setSelectCheckbox(new Map());
    } else {
      noti(res?.message ?? ERROR.FACE_RECOGNITION_LIST_INFOMATION.DELETE, {
        variant: "error",
      });
    }
  };
  //endregion

  //region handle add list information
  const handleAddList = async (data) => {
    console.log(data);
    data.description = data.description.trim();
    const dataAdd = {
      image_face_paths: images,
      name: data.name,
      id_list_name: data.list_name,
      birth_day: data.birth_day,
      gender: data.gender,
      description: data.description,
    };
    setOpen(true);
    const res = await create(dataAdd);
    if (isSuccess(res)) {
      noti(SUCCESS.FACE_RECOGNITION_LIST_INFOMATION.CREATE, {
        variant: "success",
      });
      setOpen(false);
      getFaceList();
      setImages([]);
      setOpenModal({ ...openModal, modalAdd: false });
    } else {
      setOpen(false);
      noti(res?.message ?? ERROR.FACE_RECOGNITION_LIST_INFOMATION.CREATE, {
        variant: "error",
      });
    }
  };
  //endregion

  //region handle update list information
  const handleUpdateFinance = async (data) => {
    console.log("imagesDel: ", imagesDel);
    // for (let i = 0; i < data.image_path.length; i++) {
    //   images.push(data.image_path[i].image_path);
    // }
    data.description = data.description.trim();
    const dataUpdate = {
      image_face_paths: images,
      name: data.name,
      id_list_name: data.list_name,
      birth_day: data.birth_day,
      gender: data.gender,
      description: data.description,
      id_delete_image_paths: imagesDel,
    };
    setOpen(true);
    const res = await update(selectCheckbox[0], dataUpdate);
    if (isSuccess(res)) {
      noti(SUCCESS.FACE_RECOGNITION_LIST_INFOMATION.UPDATE, {
        variant: "success",
      });
      getFaceList();
      setOpen(false);
      setImages([]);
      setOpenModal({ ...openModal, modalUpdate: false });
      selectCheckbox.length = 0;
      setSelectCheckbox(new Map());
    } else {
      setOpen(false);
      noti(res?.message ?? ERROR.FACE_RECOGNITION_LIST_INFOMATION.UPDATE, {
        variant: "error",
      });
    }
  };
  //endregion

  //region disabled or active button export/delete/update
  useEffect(() => {
    if (selectCheckbox.length !== 1) {
      updateBtnRef.current.classList.add("disabled");
      deleteBtnRef.current.classList.add("disabled");
    } else {
      updateBtnRef.current.classList.remove("disabled");
      deleteBtnRef.current.classList.remove("disabled");
    }
  }, [selectCheckbox.length]);
  //endregion

  return (
    <div id="face-recognition" className="modal-detail">
      <CLoading open={open}></CLoading>
      <Box className="button-open-modal">
        <CButton onClick={handleOpenList}>List</CButton>

        <CIconButton
          id="icon-button"
          onOpenModal={handleOpenAdd}
          className="button-addnew"
        >
          <AddIcon className="add" />
        </CIconButton>

        <CIconButton
          id="icon-button"
          onOpenModal={handleOpenUpdate}
          className="button-update"
          btnRef={updateBtnRef}
        >
          <UpdateIcon className="update" />
        </CIconButton>
        <CIconButton
          id="icon-button"
          onOpenModal={handleOpenDelete}
          className="button-delete"
          btnRef={deleteBtnRef}
        >
          <DeleteIcon className="delete" />
        </CIconButton>
      </Box>
      {/* Start Form Modal List */}
      <CForm
        hiddenBtnAction
        label="List"
        isOpen={openModal.modalList}
        unsetHeight={true}
        isHiddenAddMuti={true}
        className="manual"
        handleCloseModal={handleCloseList}
        // onClick={handleSubmit(handleAddList)}
      >
        <ModalList />
      </CForm>
      {/** End Form Modal List */}
      {/* Start Form Modal Add */}
      <CForm
        label="Create New Target"
        isOpen={openModal.modalAdd}
        // unsetHeight={true}
        isHiddenAddMuti={true}
        // className="manual"
        setImages={(value) => setImages(value)}
        handleCloseModal={handleCloseAdd}
        onClick={handleSubmit(handleAddList)}
      >
        <ModalAdd
          trigger={trigger}
          setValue={setValue}
          control={control}
          errors={errors}
          images={images}
          setImages={(value) => setImages(value)}
        />
      </CForm>
      {/** End Form Modal Add */}
      {/* Start Form Modal Update */}
      <CForm
        label="Chỉnh sửa báo cáo tài chính"
        isOpen={openModal.modalUpdate}
        unsetHeight={true}
        isHiddenAddMuti={true}
        className="manual-update"
        handleCloseModal={handleCloseUpdate}
        onClick={handleSubmit(handleUpdateFinance)}
      >
        <ModalUpdate
          setOpenModal={(value) => setOpen(value)}
          id={selectCheckbox}
          trigger={trigger}
          setValue={setValue}
          control={control}
          errors={errors}
          images={images}
          imagesDel={imagesDel}
          setImages={(value) => setImages(value)}
          reset={reset}
          setImagesDel={(value) => setImagesDel(value)}
        />
      </CForm>
      {/** End Form Modal Update */}
      {/* Start Form Modal Delete */}
      <CForm
        label="Xóa báo cáo tài chính"
        isOpen={openModal.modalDel}
        handleCloseModal={handleCloseDelete}
        addForm={handleOpenDelete}
        minWidthForm="617px"
        unsetHeight={true}
        isHiddenAddMuti={true}
        nameAction="Xóa"
        className="manual modal-device"
        onClick={handleDeleteList}
      >
        <h4 style={{ fontWeight: 500, fontSize: 20, textAlign: "center" }}>
          Bạn có chắc chắn muốn xóa không?
        </h4>
      </CForm>
      {/** End Form Modal Delete */}
    </div>
  );
}

export default ModalDetail;
