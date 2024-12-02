import React, { createContext, useContext, useEffect, useState } from "react";
import { Get_Employee_details } from "../DAL/Edit_Profile/Profile";

// Create contexts
const PrivilegesContext = createContext();
const SidebarStatusContext = createContext();
const RoleContext = createContext();
const UserDataContext = createContext();
export const ProfileImageContext = createContext();

// Custom hooks for consuming contexts
export const usePrivileges = () => useContext(PrivilegesContext);
export const useSidebarStatus = () => useContext(SidebarStatusContext);
export const useRole = () => useContext(RoleContext);
export const useUserData = () => useContext(UserDataContext);

// Context provider component
export const AppProvider = ({ children }) => {
  const Profile_Image = localStorage.getItem("UserImage");
  const [profileImage, setProfileImage] = useState(null); // Initial state for profile image
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
    const Id = localStorage.getItem("UserId");
    if (!(privileges && sidebarStatus && Role)) {
      const { employee_id } =
        Boolean(JSON.parse(localStorage?.getItem("UserData"))) &&
        JSON.parse(localStorage?.getItem("UserData"));
      if (Id || employee_id) {
        getDetails(Id || employee_id);
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (Profile_Image) {
      setProfileImage(Profile_Image);
    }
    if (userData) {
      console.log(userData, "userDatauserDatauserData");
      localStorage.setItem(
        "UserData",
        JSON.stringify({
          first_name: userData?.first_name,
          last_name: userData?.last_name,
          employee_id: userData?._id,
          address: userData?.address,
          contact_number: userData?.contact_number,
          full_name: userData?.full_name,
          email: userData?.email,
        })
      );
    }
    // eslint-disable-next-line
  }, [Profile_Image, userData]);
  return (
    <PrivilegesContext.Provider value={{ privileges, setPrivileges }}>
      <SidebarStatusContext.Provider
        value={{ sidebarStatus, setSidebarStatus, updateData }}
      >
        <RoleContext.Provider value={{ Role, setRole }}>
          <UserDataContext.Provider value={{ userData, setUserData }}>
            <ProfileImageContext.Provider
              value={{ profileImage, setProfileImage }}
            >
              {children}
            </ProfileImageContext.Provider>
          </UserDataContext.Provider>
        </RoleContext.Provider>
      </SidebarStatusContext.Provider>
    </PrivilegesContext.Provider>
  );
};
