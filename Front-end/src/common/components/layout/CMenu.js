import { List } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import CListItem from "./CListItem";

import { AssetIcon } from "@/common/assets/icons/index";

const listItems = [
  { text: "Face Recognition", icon: AssetIcon, route: "/facerecognition" },
];
function CMenu(props) {
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = React.useState(
    listItems.findIndex((item) => location.pathname == item.route)
  );
  useEffect(() => {
    setSelectedIndex(
      listItems.findIndex((item) => location.pathname == item.route)
    );
  }, [location.pathname]);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if (window.outerWidth < 1024) {
      props.closeSidebarMobile(false);
    }
  };

  return (
    <List
      id="list-menu"
      className="list-menu"
      component="nav"
      aria-label="main mailbox folders"
    >
      {listItems.map((item, index) => (
        <Link key={index} to={item.route}>
          <CListItem
            text={item.text}
            open={props.open}
            index={index}
            selectedIndex={selectedIndex}
            handleListItemClick={handleListItemClick}
          >
            <item.icon />
          </CListItem>
        </Link>
      ))}
    </List>
  );
}

export default CMenu;
