import { useEffect, useState } from "react";
import { Drawer, Divider, List } from "@mui/material";
import SearchAppBar from "../../Components/GeneralComponents/searchBar";
import Logo from "../../Components/SideBar/SideBarLogo";
import SidebarOption from "../../Components/SideBar/SideBarOptions";
import SidebarSubMenu from "../../Components/SideBar/SideBarSubMenu";
import { useNavOptions } from "../../Components/SideBar/SideBarConfig";

const AppSidebar = ({
  drawerWidth,
  container,
  mobileOpen,
  handleDrawerClose,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const options = useNavOptions();

  const generateKey = (title) =>
    title.trim().toLowerCase().replace(/\s+/g, "_");

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchInput(query);

    const results = options
      .map((item) => {
        if (item.title.toLowerCase().includes(query)) {
          return item;
        }
        const filteredChildren = item.children?.filter((child) =>
          child.title.toLowerCase().includes(query)
        );
        if (filteredChildren && filteredChildren.length > 0) {
          return { ...item, children: filteredChildren };
        }
        return null;
      })
      .filter(Boolean);

    setFilteredResults(results);
  };

  const handleSubmenuToggle = (key) => {
    setOpenSubmenus((prevOpenSubmenus) => ({
      ...prevOpenSubmenus,
      [key]: !prevOpenSubmenus[key],
    }));
  };

  const handleMobileViewChange = () => {
    if (mobileOpen) handleDrawerClose();
  };

  const drawerContent = (
    <div
      className={`custom-scrollbar ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Logo />
      <div className="Search-Bar">
        <SearchAppBar
          handleSearchChange={handleSearchChange}
          searchInput={searchInput}
          filteredResults={filteredResults}
        />
      </div>
      <Divider className="divider" />
      <List className="Main-Menu-list">
        {(filteredResults.length === 0 ? options : filteredResults).map(
          (option) => {
            const key = generateKey(option.title);
            return option.children ? (
              <SidebarSubMenu
                key={key}
                option={option}
                isOpen={!!openSubmenus[key]}
                handleToggle={() => handleSubmenuToggle(key)}
                handleMobileViewChange={handleMobileViewChange}
              />
            ) : (
              <SidebarOption
                key={key}
                option={option}
                handleMobileViewChange={handleMobileViewChange}
              />
            );
          }
        )}
      </List>
    </div>
  );

  useEffect(() => {
    // Automatically open submenus containing matching children
    if (searchInput.trim() === "") {
      setOpenSubmenus({}); // Reset open submenus when search is cleared
      return;
    }

    const newOpenSubmenus = {};
    filteredResults.forEach((item) => {
      if (item.children && item.children.length > 0) {
        const key = generateKey(item.title);
        newOpenSubmenus[key] = true; // Open all submenus with matching children
      }
    });

    setOpenSubmenus(newOpenSubmenus);
  }, [filteredResults, searchInput]);

  return (
    <div
      className="drawer-container"
      style={{ "--drawer-width": `${drawerWidth}px` }}
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerClose}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        className="drawer-temporary"
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        className="drawer-permanent"
        open
      >
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default AppSidebar;
