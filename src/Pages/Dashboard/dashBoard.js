import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { _dashboard_data } from "../../DAL/Listings/dashbaord/dashboard";
import { useUserData } from "../../Hooks/App_Context";
import { s3baseUrl } from "../../config/config";
import { Icon } from "@iconify/react";
import LunchAlert from "../../Components/GeneralComponents/Alert_For_Lunch";
import SupportTicketTable from "../../Components/Dashbaord/SupportTIcketTable";
import MembersLeavesTable from "../../Components/Dashbaord/MembersLeavesTables";
import Iconify from "../../Components/GeneralComponents/Iconify";
function HomePage() {
  const [loading, setLoading] = useState(false);
  const { userData } = useUserData();
  const [LunchContinued, setLunchContinued] = useState(true);
  const [progress, setProgress] = useState(90);
  const [OnLeaveMembersList, setOnLeaveMembersList] = useState([]);
  const [SupportTicketsList, setSupportTicketsList] = useState([]);
  const [stats, setStats] = useState([]);
  const [UserInfo, setUserInfo] = useState({
    name: "",
    designation: "",
    avatar: "",
    email: "",
    role: {},
    pending_feedbacks: "",
  });

  const Dashboard_Data_Setter = async () => {
    setLoading(true);
    const response = await _dashboard_data();
    if (response.code === 200) {
      setProgress(response.last_month_performance);
      setStats([
        {
          title: "Total Allowed Leaves",
          count: response?.allowed_leaves,
          icon: "wpf:today",
          color: "#0acf97",
        },
        {
          title: "Remaining Relax Minutes",
          count: 60 - response?.current_month_fineable_mins,
          icon: "material-symbols:relax",
          color: "#3da5f4",
        },
        {
          title: "This Month Late Minutes",
          count: response?.current_month_fineable_mins,
          icon: "ic:sharp-calendar-month",
          color: "#ff4979",
        },
        {
          title: "Total Leaves Yearly",
          count: response?.total_absents_yearly,
          icon: "ep:failed",
          color: "#fda006",
        },
        {
          title: "This Month Leaves",
          count: response?.current_month_absents,
          icon: "mdi:calendar-alert",
          color: "#00cccc",
        },
        {
          title: "Fineable Minutes",
          count: response?.current_month_fineable_mins,
          icon: "game-icons:take-my-money",
          color: "#9f3bf7",
        },
      ]);
      setOnLeaveMembersList(() => {
        if (response?.all_on_leave?.length > 0) {
          const employeeLeavesData = response?.all_on_leave?.map((item) => ({
            name: item?.emp_name || "Unknown",
            leave_date: item?.leave_date,
            leave_type: item?.leave_type,
            status: item?.status,
          }));
          return employeeLeavesData;
        } else {
          return [];
        }
      });
      setUserInfo((prev) => {
        return { ...prev, pending_feedbacks: response.pending_feedbacks };
      });
      const TicketsData = response?.latest_tickets?.map((item) => ({
        ...item,
        name: item?.name || "Unknown",
        status: item?.status,
      }));
      setSupportTicketsList(TicketsData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    Dashboard_Data_Setter();
    if (userData) {
      setUserInfo((prev) => {
        return {
          ...prev,
          name: userData?.full_name,
          avatar: s3baseUrl + userData?.profile_pic?.small,
          designation: userData?.designation,
          role: userData?.role,
        };
      });
    }
    setLunchContinued(userData?.want_lunch);
  }, [userData]);

  return (
    <>
      {loading ? (
        <div className="hv-100 d-flex justify-content-center align-items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="py-4 px-4" style={{ minHeight: "100vh" }}>
          {/* Header Section */}
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <h4 className="mb-0 text-dark col-sm-12 col-md-8 fw-normal">
              Welcome Back! {UserInfo?.name}
            </h4>
            {/* <Badge color="secondary" badgeContent={UserInfo.pending_feedbacks}>
              <Button
                fullWidth
                className="shadow-sm d-flex align-items-center col-sm-12 col-md-12"
                variant="contained"
                onClick={() => navigate("/feedbacks")}
              >
                <i className="bi bi-question-circle me-2"></i>
                Pendind Feedbacks
              </Button>
            </Badge> */}
          </div>
          <>
            {LunchContinued ? null : (
              <LunchAlert lunchState={setLunchContinued} />
            )}
          </>
          {/* Stats Section */}
          <div className="row justify-content-between">
            <div className="row col-sm-12 col-lg-9 g-3 mt-0">
              {stats.map((stat, index) => (
                <div
                  className={`col-12 col-md-6 col-lg-4 card-main ${
                    index <= 2 ? "mt-sm-3 mt-lg-0" : ""
                  }`}
                  key={index}
                >
                  <div
                    className={`custom-card text-white d-flex flex-wrap align-items-center p-3 h-100 justify-content-between rounded-3 cards`}
                    style={{
                      backgroundColor: stat.color,
                    }}
                  >
                    {/* Icon Section */}
                    <div className="col-lg-6 col-xl-3">
                      <div className="icon-section bg-white">
                        <Iconify
                          icon={stat.icon}
                          width={25}
                          height={25}
                          sx={{ color: stat.color }}
                        />
                      </div>
                    </div>
                    {/* Content Section */}
                    <div className="content-section text-center col-lg-6 col-xl-9">
                      <h5 className="stat-count text-white">{stat.count}</h5>
                      <h6 className="stat-title text-white">{stat.title}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Worker Progress Card */}
            <div className="col-sm-12 col-lg-3">
              <div className="worker-progress-card shadow-lg text-center p-3">
                <div className="progress-container">
                  <h6 className="progress-label mb-3">Monthly Progress</h6>
                  <div className="progress-circle-wrapper">
                    <div
                      className="progress-circle"
                      style={{ "--progress-value": progress }}
                    >
                      <div className="progress-inner">
                        <h6 className="progress-value">
                          {progress}
                          <span>%</span>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn link-primary mt-1 mb-0 py-0"
                  >
                    Details!
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Recent Activity Section */}
          <div className="mt-5">
            <div className="row">
              <div className="col-12 mb-5">
                <div className="px-2">
                  <div className="row main_table">
                    <div className="col-12 px-0 text-center table_text">
                      <h5 className="py-4 mb-0 fs-6 table_Title">
                        Members On Leaves
                      </h5>
                    </div>
                    <div className="col-12 px-0">
                      <MembersLeavesTable
                        OnLeaveMembersList={OnLeaveMembersList}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <>
                {(UserInfo && UserInfo?.role?.title === "HR") ||
                  UserInfo?.role?.title === "Admin" ||
                  (UserInfo.role?.title === "All" && (
                    <div className="col-12">
                      {SupportTicketsList.length > 0 ? (
                        <div className="col-12 mb-5">
                          <div className="px-2">
                            <div className="row main_table">
                              <div className="col-12 px-0 text-center table_text">
                                <h5 className="py-4 mb-0 fs-6 table_Title">
                                  Support Tickets
                                </h5>
                              </div>
                              <div className="col-12 px-0">
                                <SupportTicketTable
                                  SupportTicketsList={SupportTicketsList}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="row justify-content-center align-items-center h-75 bg-white mx-1">
                          <div className="col-1">
                            <Icon
                              icon="mdi:database-off"
                              style={{ fontSize: "48px", color: "#757575" }}
                            />
                          </div>
                          <div className="col-10">
                            <h6 className="text-muted text-center">
                              No Support Tickets Avaiable.
                            </h6>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default HomePage;
