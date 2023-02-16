import React, { useState, useEffect } from "react";
import slugify from "slugify";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useInView } from "react-intersection-observer";
import useEffectSkipFirst from "@/utils/hook/useSkipFirstEffect";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function CInputCreatable({
  onKeyDown,
  value,
  onChange,
  optionsArr,
  inputValue,
  setInView,
  loadingItem,
  onInputChange,
  open,
  type,
  multiple,
  onOpen,
  onClose,
  placeholder,
  error,
  errorText,
  yup,
}) {
  const { ref: observerRef, inView, entry } = useInView();
  const [listboxNode, setListboxNode] = useState(null);

  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const handleScroll = (event) => {
    setListboxNode(event.currentTarget);
  };

  loadingItem &&
    useEffectSkipFirst(() => {
      setInView(inView);
    }, [inView]);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(500);

      if (active) {
        setOptions([...optionsArr]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  optionsArr &&
    useEffect(() => {
      setOptions([...optionsArr]);
    }, [optionsArr]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    if (listboxNode && entry) {
      listboxNode.scrollTop = entry.target.offsetTop - 200;
    }
  }, [options]);

  const filterHandle = (option, inputValue) => {
    return option.map((item, index) => {
      const itemFormat = slugify(item?.name, {
        replacement: " ",
        lower: true,
        locale: "vi",
      });
      if (
        itemFormat.indexOf(
          slugify(inputValue.inputValue, {
            replacement: " ",
            lower: true,
            locale: "vi",
          })
        ) !== -1
      ) {
        return item;
      }
    });
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      multiple={multiple}
      sx={{ width: 300 }}
      disablePortal={true}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      onKeyDown={onKeyDown}
      value={value}
      onChange={onChange}
      inputValue={inputValue}
      onInputChange={onInputChange}
      filterOptions={loadingItem ? (x) => x : filterHandle}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      renderOption={(props, option, index) => {
        if (option) {
          return (
            <li {...props} ref={observerRef} key={props["data-option-index"]}>
              {option.name ? option.name : option.realname}
            </li>
          );
        }
      }}
      getOptionLabel={(option) => {
        return option?.name || option?.realname
          ? option?.name
            ? option?.name
            : option?.realname
          : "";
      }}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          error={error}
          type={type}
          helperText={errorText}
          hiddenLabel={true}
          {...yup}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      ListboxProps={{
        onScroll: handleScroll,
      }}
    />
  );
}
