import React, { useState } from "react";

// import ReactImgPreviewer from "react-img-previewer";
import { Box, FormControl, FormHelperText, IconButton } from "@mui/material";
import { AccountBox, ChangeCircle, Visibility } from "@mui/icons-material";

const CUploadImage = ({
  position,
  error,
  errorText,
  imgUrl,
  onChange,
  height,
  yup,
}) => {
  //   const [preview, setPreview] = useState(false);

  //   const handlePreview = () => setPreview(true);

  //   const closePreview = () => setPreview(false);
  return (
    <FormControl>
      <Box component={"label"} className="">
        <Box
          height={height ?? 150}
          width="100%"
          position="relative"
          className="cupload-bgImg"
          sx={
            imgUrl
              ? {
                  backgroundImage: `url("${
                    process.env.REACT_APP_FACERECOGNITION_LIST_INFORMATION +
                    imgUrl
                  }")`,
                }
              : null
          }
          {...yup}
        >
          {/* {!imgUrl ? ( */}
          <>
            <AccountBox
              color="action"
              className="cupload-image"
              sx={{ opacity: imgUrl ? "0" : "1" }}
            />
            <input
              type="file"
              accept="image/*"
              hidden
              disabled={imgUrl ? true : false}
              onChange={onChange}
            />
          </>

          {/* ) : (
            <Box className="!absolute right-0">
              <IconButton onClick={handlePreview}>
                <Visibility />
              </IconButton>
              <IconButton component="label">
                <ChangeCircle />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={onRechange}
                />
              </IconButton>
            </Box>
          )} */}
        </Box>
      </Box>
      {error && (
        <FormHelperText
          error={!!error}
          htmlFor="form-selector"
          style={{ position: position ? "absolute" : "unset", bottom: -24 }}
        >
          {errorText}
        </FormHelperText>
      )}
      {/* {preview && (
        <ReactImgPreviewer
          imageList={[{ url: imgUrl }]}
          defaultIndex={0}
          onClose={closePreview}
        />
      )} */}
    </FormControl>
  );
};

export default CUploadImage;
