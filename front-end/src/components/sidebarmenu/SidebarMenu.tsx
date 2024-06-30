import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  FaBars,
  FaTachometerAlt,
  FaFileAlt,
  FaSave,
  FaCog,
  FaUpload,
  FaSlidersH,
} from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";

const MenuSidebar = styled("div")<{ isOpen: boolean }>(() => ({
  width: "60px",
  backgroundColor: "#1e1e1e",
  left: 0,
  top: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "20px 0",
}));

const MenuIcon = styled("div")({
  color: "white",
  fontSize: "24px",
  cursor: "pointer",
  padding: "0 18px",
  marginBottom: "40px",
});

const MenuItems = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const MenuItem = styled("div")({
  color: "white",
  display: "flex",
  alignItems: "center",
  padding: "10px 18px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#333",
  },
});

const SidebarMenu: React.FC<{ onToggle: (isOpen: boolean) => void }> = ({
  onToggle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  return (
    <MenuSidebar isOpen={isOpen}>
      <div>
        <MenuIcon onClick={toggleMenu}>
          <FaBars />
        </MenuIcon>
        <MenuItems>
          <Tooltip title="Dashboard" placement="right">
            <MenuItem>
              <FaTachometerAlt />
            </MenuItem>
          </Tooltip>
          <Tooltip title="Description" placement="right">
            <MenuItem>
              <FaFileAlt />
            </MenuItem>
          </Tooltip>
          <Tooltip title="Saved" placement="right">
            <MenuItem>
              <FaSave />
            </MenuItem>
          </Tooltip>
        </MenuItems>
      </div>
      <MenuItems>
        <Tooltip title="Preferences" placement="right">
          <MenuItem>
            <FaSlidersH />
          </MenuItem>
        </Tooltip>
        <Tooltip title="Upload" placement="right">
          <MenuItem>
            <FaUpload />
          </MenuItem>
        </Tooltip>
        <Tooltip title="Settings" placement="right">
          <MenuItem>
            <FaCog />
          </MenuItem>
        </Tooltip>
      </MenuItems>
    </MenuSidebar>
  );
};

export default SidebarMenu;
