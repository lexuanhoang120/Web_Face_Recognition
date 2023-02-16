import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

export default function LabTabs(props) {
  const { value, tabs, children, onChange } = props;

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        position: "relative",
      }}
    >
      <TabContext value={value}>
        <Box>
          <TabList onChange={onChange}>
            {tabs &&
              tabs.map((item) => (
                <Tab label={item.name} value={item.id} key={item.id} />
              ))}
          </TabList>
        </Box>
        {children}
      </TabContext>
    </Box>
  );
}
