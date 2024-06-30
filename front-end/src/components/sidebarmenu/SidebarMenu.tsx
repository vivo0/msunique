import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  FaBars,
  FaTimes,
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
  transition: "width 0.3s ease-in-out",
}));

const MenuIcon = styled("div")<{ isOpen: boolean }>(({ isOpen }) => ({
  color: "white",
  fontSize: "24px",
  cursor: "pointer",
  padding: "0 18px",
  marginBottom: "40px",
  transition: "transform 0.3s ease-in-out",
  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
}));

const MenuItems = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const MenuItem = styled("div")<{ isSelected: boolean }>(({ isSelected }) => ({
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 0",
  cursor: "pointer",
  backgroundColor: isSelected ? "#2a2a2a" : "transparent",
  "&:hover": {
    backgroundColor: "#333",
  },
}));

const SidebarMenu: React.FC<{ onToggle: (isOpen: boolean) => void }> = ({
  onToggle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("dashboard");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  const handleItemClick = (itemName: string) => {
    setSelectedItem(itemName);
  };

  return (
    <MenuSidebar isOpen={isOpen}>
      <div>
        <MenuIcon isOpen={isOpen} onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MenuIcon>
        <MenuItems>
          <Tooltip title="Dashboard" placement="right">
            <MenuItem
              isSelected={selectedItem === "dashboard"}
              onClick={() => handleItemClick("dashboard")}
            >
              <FaTachometerAlt />
            </MenuItem>
          </Tooltip>
          <Tooltip title="Description" placement="right">
            <MenuItem
              isSelected={selectedItem === "description"}
              onClick={() => handleItemClick("description")}
            >
              <FaFileAlt />
            </MenuItem>
          </Tooltip>
          <Tooltip title="Saved" placement="right">
            <MenuItem
              isSelected={selectedItem === "saved"}
              onClick={() => handleItemClick("saved")}
            >
              <FaSave />
            </MenuItem>
          </Tooltip>
        </MenuItems>
      </div>
      <MenuItems>
        <Tooltip title="Preferences" placement="right">
          <MenuItem
            isSelected={selectedItem === "preferences"}
            onClick={() => handleItemClick("preferences")}
          >
            <FaSlidersH />
          </MenuItem>
        </Tooltip>
        <Tooltip title="Upload" placement="right">
          <MenuItem
            isSelected={selectedItem === "upload"}
            onClick={() => handleItemClick("upload")}
          >
            <FaUpload />
          </MenuItem>
        </Tooltip>
        <Tooltip title="Settings" placement="right">
          <MenuItem
            isSelected={selectedItem === "settings"}
            onClick={() => handleItemClick("settings")}
          >
            <FaCog />
          </MenuItem>
        </Tooltip>
      </MenuItems>
    </MenuSidebar>
  );
};

export default SidebarMenu;
