import { Box } from "@mui/material";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { TabPanel } from "@mui/lab";
import { tabArrs } from "@/common/constants/variables";
import {
  CSelect,
  CTabs,
  CButton,
  CLoading,
} from "@/common/components/controls/";
import ModalDetail from "../components/index";
import MTable from "./List/Table";
import { getAll as getFaceList } from "@/common/queries-fn/face.list.query";
import { DiffArray } from "@/utils/func";

const selectData = createSelector(
  (state) => state.config,
  ({ isLoading }) => ({ isLoading })
);

function Finance() {
  const { isLoading } = useSelector(selectData);
  const paginationRef = useRef(null);

  /*Tabs */
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [filter, setFilter] = useState({
    page: 1,
    rowsPerPage: 20,
  });

  const [company, setCompany] = useState(-1);
  const [companyArr, setCompanyArr] = useState([]);

  const [financialYear, setFinancialYear] = useState(-1);

  const [changePage, setChangePage] = useState(false);

  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState("");

  const [selection, setSelection] = useState(new Map());

  const [concatArr, setConcatArr] = useState([]);

  const [gotoPageValue, setGoToPageValue] = useState(1);
  // Backdrop
  const [open, setOpen] = useState(false);

  // get all face list
  const { data: _data, refetch } = getFaceList(filter, isLoading);

  const data = useMemo(() => _data?.data ?? [], [_data]);
  useEffect(() => {
    // console.log(data);
    // console.log(_data);
    setRows(data);
    setOpen(false);
    setTotalRows(_data?.nItems ?? data.length);
    // getAllCompanies();
  }, [_data]);

  //click select 1 checkbox table
  const handleClick = (event, row, index) => {
    setChangePage(false);
    const newSelection = new Map(selection);
    const checkboxRow = document.querySelectorAll(
      "tbody tr input[type=checkbox]"
    );
    if (event.target === checkboxRow[index]) {
      checkboxRow[index].checked = !checkboxRow[index].checked;
    }
    const isFind = rows.find((item) => item._id == row._id);
    if (isFind._id == row._id) {
      checkboxRow[index].checked = !checkboxRow[index].checked;
    }
    let items = [];
    if (checkboxRow[index].checked) {
      items = newSelection.get(filter.page);
      if (items) {
        items.push(row._id);
        setConcatArr(concatArr.concat(row._id));
      } else {
        items = [row._id];
        setConcatArr(concatArr.concat(row._id));
      }
      newSelection.set(filter.page, items);
    } else {
      items = newSelection.get(filter.page);
      if (items) {
        const index = items.findIndex((item) => item === row._id);
        if (index !== -1) {
          items = items.filter((item) => item !== row._id);
          setConcatArr(concatArr.filter((concat) => concat !== row._id));
          newSelection.set(filter.page, items);
        }
      }
    }
    setSelection(newSelection);
  };
  // isSelected
  const isSelected = (id) => {
    const items = selection.get(filter.page);
    if (items) return items.indexOf(id) !== -1;
    else return false;
  };
  //click select all checkbox table
  const handleSelectAllClick = (event) => {
    const newSelection = new Map(selection);
    if (event.target.checked) {
      let items = [];
      rows.forEach((item) => items.push(item.id));
      setConcatArr(concatArr.concat(items));
      newSelection.set(filter.page, items);
    } else {
      setConcatArr(concatArr.DiffArray(selection.get(filter.page)));
      newSelection.set(filter.page, []);
    }
    setSelection(newSelection);
    setChangePage(false);
  };

  //change page size
  const handleChangePageSize = (event) => {
    setConcatArr([]);
    setFilter({ ...filter, page: 1, rowsPerPage: event.target.value });
    setSelection(new Map());
    setChangePage(true);
  };
  // change page
  const handleChangePage = (e, newPage) => {
    setChangePage(true);
    setFilter({ ...filter, page: newPage });
  };

  //state financialYear
  const financialYearArr = [];
  for (let i = 2000; i <= 2100; i++) {
    financialYearArr.push({ id: i, name: i });
  }
  //get all company
  const getAllCompanies = async () => {
    const res = await getCompany();
    setCompanyArr(res.data);
  };
  //handle search
  const handleSearch = () => {
    setChangePage(false);
    setFilter({
      page: 1,
      rowsPerPage: filter.rowsPerPage,
      financialYear: financialYear === -1 ? "" : financialYear,
      company: company === -1 ? "" : company,
    });
  };

  //open loading
  useEffect(() => {
    setOpen(true);
  }, []);

  //scroll to bottom when change pagination
  if (changePage) {
    paginationRef.current?.scrollIntoView();
  }
  return (
    <Box>
      {/* <CLoading open={open}></CLoading> */}

      <Box style={{ position: "relative" }}>
        <CTabs value={value} onChange={handleChange} tabs={tabArrs}>
          <Box className="face_list_search">
            <CSelect
              value={financialYear}
              onChange={(e) => setFinancialYear(e.target.value)}
              options={financialYearArr}
              defaultValue="---- Năm tài chính ----"
              sx={{ width: "260px" }}
            />
            <CSelect
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              options={companyArr}
              defaultValue="---- Công ty ----"
              sx={{ width: "260px" }}
            />

            <CButton variant="contained" onClick={handleSearch}>
              Tìm kiếm
            </CButton>
          </Box>
          <TabPanel value="1">
            <ModalDetail
              getFaceList={refetch}
              selectCheckbox={concatArr}
              setSelectCheckbox={(value) => setSelection(value)}
            ></ModalDetail>
            <MTable
              selection={
                selection && selection.get(filter.page)
                  ? selection.get(filter.page).length === rows.length
                  : false
              }
              setting={filter}
              rows={rows}
              totalRows={totalRows}
              handleSelectAllClick={handleSelectAllClick}
              handleChangePageSize={handleChangePageSize}
              handleChangePage={handleChangePage}
              handleClick={handleClick}
              isSelected={isSelected}
              paginationRef={paginationRef}
            />
          </TabPanel>
          <TabPanel value="2">
            <div>alo</div>
          </TabPanel>
          <TabPanel value="3">
            <div>alo</div>
          </TabPanel>
        </CTabs>
      </Box>
    </Box>
  );
}

export default Finance;
