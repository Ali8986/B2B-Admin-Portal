import React, { createContext, useContext, useEffect, useState } from "react";
import { Get_Employee_details } from "../DAL/Edit_Profile/Profile";

// Create contexts
const PrivilegesContext = createContext();
const SidebarStatusContext = createContext();
const RoleContext = createContext();
const UserDataContext = createContext();

// Custom hooks for consuming contexts
export const usePrivileges = () => useContext(PrivilegesContext);
export const useSidebarStatus = () => useContext(SidebarStatusContext);
export const useRole = () => useContext(RoleContext);
export const useUserData = () => useContext(UserDataContext);

// Context provider component
export const AppProvider = ({ children }) => {
  const [privileges, setPrivileges] = useState(null);
  const [sidebarStatus, setSidebarStatus] = useState(null);
  const [Role, setRole] = useState(null);
  const [userData, setUserData] = useState(null);

  const updateData = (data) => {
    setPrivileges(data.privileges);
    setSidebarStatus(data.sidebar_status);
    setRole(data.role);
    setUserData(data.employee_data);
  };

  const getDetails = async (id) => {
    const response = await Get_Employee_details(id);
    if (response.code === 200) {
      setSidebarStatus(response?.employee?.sidebar_status);
      setPrivileges(response?.employee?.previllages);
      setRole(response?.employee?.role);
      setUserData(response?.employee);
    }
  };

  useEffect(() => {
    if (!(privileges && sidebarStatus && Role)) {
      const id = localStorage.getItem("UserId");
      if (id) {
        getDetails(id);
      }
    }
  }, []);
  return (
    <PrivilegesContext.Provider value={{ privileges, setPrivileges }}>
      <SidebarStatusContext.Provider
        value={{ sidebarStatus, setSidebarStatus, updateData }}
      >
        <RoleContext.Provider value={{ Role, setRole }}>
          <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
          </UserDataContext.Provider>
        </RoleContext.Provider>
      </SidebarStatusContext.Provider>
    </PrivilegesContext.Provider>
  );
};
