import React, { useState, useEffect, useRef } from "react";
import CTable from "@/common/components/layout/CTable";
import CLoading from "@/common/components/controls/CLoading/CLoading";
import { Box, Checkbox, TableCell, TableRow } from "@mui/material";
import { getAll as getListStorage } from "@/apis/face.list_storage.api";
import { AddIcon, DeleteIcon, UpdateIcon } from "@/modules/_assets/icons/index";
import CIconButton from "@/common/components/controls/CIconButton/CIconButton";
import CForm from "@/common/components/controls/CForm/CForm";
import CInput from "@/common/components/controls/CInput/CInput";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { faceListValidate } from "../../validation";
import { faceListValues } from "../../initialValues";
import { getById } from "@/apis/face.list_storage.api";
import { create, update, remove } from "@/apis/face.list_storage.api";
import { SUCCESS, ERROR } from "@/common/constants/message";
import { isSuccess } from "@/utils/func/";
import { noti } from "@/App";

//head table
const headCells = [
  {
    name: "Created Time",
  },
  {
    name: "List Name",
  },
  { name: "" },
];

function ModalList() {
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({
    faceListValues,
    resolver: yupResolver(faceListValidate),
  });
  // Backdrop
  const [open, setOpen] = useState(false);

  const updateBtnRef = useRef(null);
  const deleteBtnRef = useRef(null);

  const [openModal, setOpenModal] = useState({
    modalAdd: false,
    modalUpdate: false,
    modalDel: false,
  });

  const [idList, setIdList] = useState("");

  // rows
  const [rows, setRows] = useState([]);

  //get all list storage
  const getAllStorageList = async () => {
    const res = await getListStorage();
    await setRows(res.data);
    await setOpen(false);
  };

  useEffect(() => {
    getAllStorageList();
  }, []);

  //open/close modal add
  const handleOpenAdd = async () => {
    setOpenModal({ ...openModal, modalAdd: true });
    setOpen(true);
    clearErrors();
    reset({});
  };

  const handleCloseAdd = async () => {
    setOpenModal({ ...openModal, modalAdd: false });
    await setOpen(false);
  };

  //open/close modal update
  const handleOpenUpdate = async (id) => {
    const res = await getById(id);
    setOpenModal({ ...openModal, modalUpdate: true });
    setOpen(true);
    clearErrors();
    reset({
      list_name: res.list_name,
    });
    setIdList(id);
  };
  const handleCloseUpdate = async () => {
    setOpenModal({ ...openModal, modalUpdate: false });
    await setOpen(false);
  };

  // open/close modal delete
  const handleOpenDelete = (id) => {
    setOpenModal({ ...openModal, modalDel: true });
    setIdList(id);
  };
  const handleCloseDelete = async () => {
    setOpenModal({ ...openModal, modalDel: false });
    await setOpen(false);
  };
  //handle add list
  const handleAddList = async (data) => {
    setOpen(true);
    let dataAdd = new FormData();

    for (var key in data) {
      dataAdd.append(key, data[key]);
    }
    const res = await create(dataAdd);
    if (isSuccess(res)) {
      noti(SUCCESS.FACE_RECOGNITION_LIST_STORAGE.CREATE, {
        variant: "success",
      });
      getAllStorageList();
      setOpen(false);
      handleCloseAdd();
    } else {
      setOpen(false);
      noti(res?.message ?? ERROR.FACE_RECOGNITION_LIST_STORAGE.CREATE, {
        variant: "error",
      });
    }
  };

  //handle update list
  const handleUpdateList = async (data, id) => {
    setOpen(true);
    let dataUpdate = new FormData();
    for (var key in data) {
      dataUpdate.append(key, data[key]);
    }

    const res = await update(idList, dataUpdate);
    if (isSuccess(res)) {
      noti(SUCCESS.FACE_RECOGNITION_LIST_STORAGE.UPDATE, {
        variant: "success",
      });
      getAllStorageList();
      setOpen(false);
      setOpenModal({ ...openModal, modalUpdate: false });
    } else {
      setOpen(false);
      noti(res?.message ?? ERROR.FACE_RECOGNITION_LIST_STORAGE.UPDATE, {
        variant: "error",
      });
    }
  };

  // handle delete list
  const handleDeleteList = async (e) => {
    e.preventDefault();
    const res = await remove(idList);
    console.log(res);
    if (isSuccess(res)) {
      noti(SUCCESS.FACE_RECOGNITION_LIST_STORAGE.DELETE, {
        variant: "success",
      });
      getAllStorageList();
      handleCloseDelete();
    } else {
      noti(res?.message ?? ERROR.FACE_RECOGNITION_LIST_STORAGE.DELETE, {
        variant: "error",
      });
    }
  };

  return (
    <Box id="info-item" className="info-item">
      <CLoading open={open}></CLoading>
      <CIconButton
        id="icon-button"
        onOpenModal={handleOpenAdd}
        className="button-addnew mb-2"
      >
        <AddIcon className="add" />
      </CIconButton>
      <CTable
        unsetHeight
        noCheckbox
        noPagination
        headCells={headCells}
        rows={rows}
      >
        {rows &&
          rows.map((row, index) => {
            return (
              <TableRow key={row._id} hover role="checkbox" tabIndex={-1}>
                <TableCell>{row.created_time}</TableCell>
                <TableCell>{row.list_name}</TableCell>
                <TableCell>
                  <Box className="face_list_storage_btn">
                    <CIconButton
                      id="icon-button"
                      onOpenModal={() => handleOpenUpdate(row._id)}
                      className="button-update"
                      btnRef={updateBtnRef}
                    >
                      <UpdateIcon className="update" />
                    </CIconButton>
                    <CIconButton
                      id="icon-button"
                      onOpenModal={() => handleOpenDelete(row._id)}
                      className="button-delete"
                      btnRef={deleteBtnRef}
                    >
                      <DeleteIcon className="delete" />
                    </CIconButton>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
      </CTable>

      <CForm
        label="New List"
        isOpen={openModal.modalAdd}
        unsetHeight
        isHiddenAddMuti
        className="unset-height"
        handleCloseModal={handleCloseAdd}
        onClick={handleSubmit(handleAddList)}
      >
        <Box className="info-item__input">
          <p className="nowrap w-20">
            List Name<span className="required-input"> *</span>
          </p>
          <Controller
            name="list_name"
            control={control}
            render={({ field }) => (
              <CInput
                className="face_list_input"
                error={!!errors?.list_name}
                errorText={
                  errors?.list_name?.name?.message ?? errors?.list_name?.message
                }
                onChange={(event, value) => field.onChange(value)}
                // placeholder="Please fill this field"
                yup={{ ...field }}
              />
            )}
          />
        </Box>
      </CForm>

      <CForm
        label="Edit List"
        isOpen={openModal.modalUpdate}
        unsetHeight
        isHiddenAddMuti
        className="unset-height"
        handleCloseModal={handleCloseUpdate}
        onClick={handleSubmit(handleUpdateList)}
      >
        <Box className="info-item__input">
          <p className="nowrap w-20">
            List Name<span className="required-input"> *</span>
          </p>
          <Controller
            name="list_name"
            control={control}
            render={({ field }) => (
              <CInput
                value={field.value ?? ""}
                className="face_list_input"
                error={!!errors?.list_name}
                errorText={
                  errors?.list_name?.name?.message ?? errors?.list_name?.message
                }
                onChange={(event, value) => field.onChange(value)}
                // placeholder="Please fill this field"
                yup={{ ...field }}
              />
            )}
          />
        </Box>
      </CForm>

      <CForm
        label="Delete List"
        isOpen={openModal.modalDel}
        addForm={handleOpenDelete}
        handleCloseModal={handleCloseDelete}
        unsetHeight={true}
        isHiddenAddMuti={true}
        nameAction="Xóa"
        className="manual modal-device unset-height"
        onClick={handleDeleteList}
      >
        <h4 style={{ fontWeight: 500, fontSize: 20, textAlign: "center" }}>
          Bạn có chắc chắn muốn xóa không?
        </h4>
      </CForm>
    </Box>
  );
}

export default ModalList;
