import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Iconify from "../../Components/GeneralComponents/Iconify";
import { color } from "@mui/system";
// status &&
//   (status?.role?.toLowerCase() === "admin" ||
//     status?.role?.toLowerCase() === "hr" ||
//     status?.role?.toLowerCase() === "all");
const options = ["Progress History", "Feedback History"];

const ITEM_HEIGHT = 48;
const array = [
  {
    icon: "streamline:graph-bar-increase",
    color: "#006599",
  },
  {
    icon: "ic:round-history",
    color: "#006599",
  },
];

export default function LongMenu({ status }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon className="fs-2" />
      </IconButton>
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={{ top: 225, left: 1500 }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "200px",
            },
          },
        }}
      >
        {options.map((option, index) => (
          <div className="d-flex gap-0" key={index}>
            <MenuItem>
              <Iconify
                width={20}
                height={20}
                icon={array[index].icon}
                color={array[index].color}
              />
            </MenuItem>
            <MenuItem
              key={option}
              selected={option === "Pyxis"}
              onClick={handleClose}
            >
              {option}
            </MenuItem>
          </div>
        ))}
      </Menu>
    </>
  );
}
