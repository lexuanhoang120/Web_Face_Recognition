import React from "react";

import { Modal, Box, IconButton } from "@mui/material";

import {
  AddCircleOutlineOutlined as AddIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";

import classNames from "classnames";

import CLabel from "../../others/CLabel";
import CButton from "../CButton/CButton";

import CIconButton from "@/common/components/controls/CIconButton/CIconButton";
function CForm({
  hiddenBtnAction,
  label,
  isOpen,
  handleCloseModal,
  addForm,
  children,
  className,
  minWidthForm,
  unsetHeight,
  isHiddenAddMuti,
  nameAction,
  onClick,
}) {
  return (
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="form"
    >
      <form>
        <Box
          className="form-wrap"
          style={{
            width: minWidthForm || "80%",
            height: unsetHeight ? "unset" : "98%",
          }}
        >
          <Box
            className="form-wrap-close"
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton onClick={handleCloseModal}>
              <ClearIcon></ClearIcon>
            </IconButton>
          </Box>
          <CLabel id="label">
            <span>{label}</span>
          </CLabel>

          <Box className={classNames("form-wrap-body", className)}>
            {children}
          </Box>

          <Box
            className="form-wrap-actions"
            sx={{ justifyContent: isHiddenAddMuti && "flex-end !important" }}
          >
            {isHiddenAddMuti ? (
              ""
            ) : (
              <Box>
                <CIconButton
                  id="icon-button"
                  type="button"
                  onOpenModal={addForm}
                  className="button-addnew"
                >
                  <AddIcon />
                </CIconButton>
              </Box>
            )}

            {!hiddenBtnAction && (
              <Box>
                <CButton
                  className="form-wrap-actions-cancel"
                  onClick={handleCloseModal}
                >
                  Hủy
                </CButton>
                <CButton
                  type="submit"
                  className="form-wrap-actions-save"
                  onClick={onClick}
                >
                  {nameAction || "Lưu"}
                </CButton>
              </Box>
            )}
          </Box>
        </Box>
      </form>
    </Modal>
  );
}

export default CForm;
