import React, { useEffect, useState } from "react";
import HeaderWithBackButton from "../../Components/backButton";
import {
  Button,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ReactDataTable from "../../Components/GeneralComponents/React_Table";
import DetailsModal from "../../Components/GeneralComponents/detailsModal";
import DeletingModal from "../../Components/GeneralComponents/CustomDeletingModal";
import CustomDrawer from "../../Components/GeneralComponents/CustomDrawer";
import { useSnackbar } from "notistack";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import ExhibitorDetailsModal from "../../Components/Exhibitors/ExhibitorDetails";
import DeletionConfirmation from "../Exhibitors/DeletingUser";
import { useNavigate } from "react-router-dom";
import FeedbackCard from "./FeedbackCard";
import { useUserData } from "../../Hooks/App_Context";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Feedback_listing } from "../../DAL/Listings/feedbacks/feedbacklisting";
import ReactTable from "@meta-dev-zone/react-table";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ReactFilterChips from "react-filter-chips";
import { EditNotifications } from "@mui/icons-material";
import moment from "moment";
import ToolTip from "../../Components/GeneralComponents/ToolTip";
import ToggleMenu from "./menu";
import LongMenu from "./menu";
import FeedbackFilter from "./Feedback_Filter";
import { data } from "jquery";
import Iconify from "../../Components/GeneralComponents/Iconify";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const FeedBacks = () => {
  const { userData } = useUserData();
  const [pendingFeedbacks, setPendingFeedbacks] = useState();
  const [feedbackRemaining, setFeedbackRemaining] = useState([]);
  const [status, setStatus] = useState({
    role: null,
  });

  const EMPTY_FILTER = {
    date: "",
    emp_name: "",
    search: "",
  };

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [totalPages, setTotalPages] = useState(0);
  const [valueForDeleting, setValueForDeleting] = useState(null);
  const [searchCompanyData, setSearchCompanyData] = useState([]);
  const [filterState, setFilterState] = useState(EMPTY_FILTER);
  const [filterStateTem, setFilterStateTem] = useState(EMPTY_FILTER);
  const [filterData, setSetFilterData] = useState(EMPTY_FILTER);
  const [value, setValue] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [feedbackList, setFeedbackList] = useState([]);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const getAllFeedbackList = async (page, rowsperpage, search) => {
    setLoading(true);
    const response = await Feedback_listing(page, rowsperpage, search);
    if (response.code === 200) {
      const proccessedData = response.feedback.map((item) => ({
        ...item,
        name: item.title || "Unknown",
        status: item.status,
      }));
      setFeedbackList(proccessedData);
      setPendingFeedbacks(response.count);
      setFeedbackRemaining(response.remaining_emps);
      setTotalCount(1);
      setTotalPages(response.count);
      const ChipData = { ...search };
      console.log(ChipData, " ChipData ChipData v ChipData ChipData  vc");
      setFilterState(ChipData);
      setFilterStateTem(ChipData);
      console.log(response, "response response response response");
      setLoading(false);
    } else {
      setLoading(false);
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  const MENU_OPTIONS = [
    {
      label: "Delete",
      icon: (
        <Iconify
          width={20}
          height={20}
          icon={"mdi:delete-alert-outline"}
          color={"red"}
        />
      ),
      // handleClick: handleEdit,
    },
    // {
    //   label: "Delete",
    //   icon: <DeleteForeverIcon className="Delete-Icon" />,
    //   handleClick: handleDelete,
    // },
    // {
    //   label: "View Details",
    //   icon: <ContactPageIcon />,
    //   handleClick: handleDetails,
    // },
  ];

  const options = ["Pyxis", "Ganymede", "Callisto", "Eris"];
  const ITEM_HEIGHT = 48;

  const TABLE_HEAD = [
    { id: "action", label: "Action", type: "action" },
    {
      id: "any",
      label: "#",
      renderData: (value, index) => {
        return index + 1;
      },
    },
    {
      id: "month",
      label: "Month",
      renderData: (row, index) => {
        return (
          <span key={index}>
            {" "}
            {row.month
              ? moment(row.month, "MM").format("MMM") + " " + row.year
              : "_ _ / _ _ "}
          </span>
        );
      },
    },
    {
      id: "any",
      label: "Title",
      className: "cursor-pointer",
      renderData: (row, index) => {
        return (
          <ToolTip key={index} title={row.title} arrow>
            <span>{row.title}</span>
          </ToolTip>
        );
      },
    },
    status &&
      (status?.role?.toLowerCase() === "admin" ||
        status?.role?.toLowerCase() === "hr" ||
        status?.role?.toLowerCase() === "all") && {
        id: "any",
        label: "Send To",
        renderData: (row, index) => {
          return row.send_to.name ? (
            <span>{row.send_to.name}</span>
          ) : (
            <span>N/A</span>
          );
        },
      },
    {
      id: "any",
      label: "Send For",
      renderData: (row) => {
        return (
          <>
            <span>{row.send_for.name}</span>
          </>
        );
      },
    },
    {
      id: "Status",
      label: "Status",
      type: "row_status",
    },
    {
      id: "any",
      label: "Submission Status",
      renderData: (row) => {
        return (
          <div>
            <Chip
              label={
                row.submission_status === "pending"
                  ? "Pending"
                  : row.submission_status === "confirmed"
                  ? "Confirmed"
                  : row.submission_status === "cancelled"
                  ? "Cancelled"
                  : ""
              }
              color={
                row.submission_status === "pending"
                  ? "secondary"
                  : row.submission_status === "confirmed"
                  ? "success"
                  : row.submission_status === "cancelled"
                  ? "error"
                  : ""
              }
            />
          </div>
        );
      },
    },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log("helsasd", anchorEl);
    setAnchorEl(null);
  };

  const handleOpenDrawer = (e) => {
    e.preventDefault();
    console.log("Hellow");
    setIsOpen(true);
  };

  const handleStatusChange = (e) => {
    setSetFilterData((prevData) => ({
      ...prevData,
      status: e.target.value || "",
    }));
  };

  const handleAddingMember = () => {
    navigate("/exhibitors/addexhibitor/");
  };

  const handleChangePage = (newPage) => {
    alert("sakdjsalkjdlk");
    setPage(newPage);
    getAllFeedbackList(newPage, rowsPerPage, {});
  };

  const RemoveFilterData = (e) => {
    e.preventDefault();
    setSetFilterData({
      search: "",
      emp_name: "",
      date: "",
    });
    setValue(null);
    setSetFilterData((prev) => {
      return {
        ...prev,
        emp_name: "all",
      };
    });
    localStorage.removeItem("filter_feedback_data");
    localStorage.removeItem("Chips");
    setFilterState(EMPTY_FILTER);
    setFilterStateTem(EMPTY_FILTER);
    getAllFeedbackList(page, rowsPerPage, EMPTY_FILTER);
    setIsOpen(false);
  };

  const handleCompanyNameChange = (event, newValue) => {
    setValue(newValue);
    setSetFilterData((prevData) => ({
      ...prevData,
      emp_name: newValue?.full_name,
    }));
  };

  const handleRowsPerPageChange = (event) => {
    console.log("Event Triggered:", event);
    console.log("Event Target Value:", event.target.value);
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    getAllFeedbackList(0, newRowsPerPage, {});
  };

  const searchFunction = (e) => {
    e.preventDefault();
    setPage(0);
    setIsOpen(false);
    // filterData.search = searchText || "";
    // filterData.emp_name = emp_name || "";
    if (filterData.date == "") {
      console.log(
        filterData,
        "filterData filterDatafilterDatafilterDatafilterData"
      );
      filterData.date = moment(new Date()).format("YYYY-MM");
    }

    localStorage.setItem("filter_feedback_data", JSON.stringify(filterData));
    getAllFeedbackList(page, rowsPerPage, filterData);
  };

  const onDeleteChip = (data) => {
    console.log(data, "data");
    localStorage.setItem("Chips", JSON.stringify(data));
    setFilterState(data);
    setFilterStateTem(data);
    getAllFeedbackList(page, rowsPerPage, data);
  };

  const hideExhibitorDetailsModal = (e) => {
    setShowDetails(false);
    setSelectedObject(null);
  };

  const onClear = () => {
    localStorage.removeItem("Chips");
    localStorage.removeItem("filter_feedback_data");
    setFilterState(EMPTY_FILTER);
    setFilterStateTem(EMPTY_FILTER);
    getAllFeedbackList(page, rowsPerPage, EMPTY_FILTER);
  };

  const showExhibitorDetailsModal = (e) => {
    setShowDetails(true);
  };

  const onConfirm = async (e) => {
    // e.preventDefault();
    // const response = await DeletingExhibitor(valueForDeleting._id);
    // if (response.code === 200) {
    //   enqueueSnackbar(response.message, { variant: "success" });
    //   // eslint-disable-next-line
    //   const ExhibitorsAfterDeletion = users.filter((user) => {
    //     if (user._id !== valueForDeleting._id) {
    //       // eslint-disable-next-line
    //       return (user.name = user.name);
    //     }
    //   });
    //   setTotalPages((prev) => prev - 1);
    //   setUsers(ExhibitorsAfterDeletion);
    // } else {
    //   enqueueSnackbar(response.message, { variant: "error" });
    // }
    setModelOpen(false);
  };

  const onCancel = () => {
    setModelOpen(false);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (userData) {
      setStatus((prev) => {
        return {
          ...prev,
          permissions: userData?.previllages?.feedback?.view,
          role: userData?.role?.title,
        };
      });
    }
  }, [userData]);

  useEffect(() => {
    const savedSearchText = JSON.parse(
      localStorage.getItem("filter_feedback_data")
    );
    const FilterFeedbackData = JSON.parse(
      localStorage.getItem("filter_feedback_data")
    );
    const count = localStorage.getItem("rowsPerPage");
    if (savedSearchText) {
      getAllFeedbackList(page, rowsPerPage, savedSearchText);
      setTotalPages(count);
    } else if (FilterFeedbackData) {
      console.log(
        FilterFeedbackData,
        "FilterFeedbackDataFilterFeedbackDataFilterFeedbackDataFilterFeedbackDataFilterFeedbackDataFilterFeedbackDataFilterFeedbackData"
      );
      getAllFeedbackList(page, rowsPerPage, FilterFeedbackData);
    } else {
      getAllFeedbackList(page, rowsPerPage, {});
    }
    // eslint-disable-next-line
  }, [page, rowsPerPage]);

  // useEffect(() => {
  //   getAllFeedbackList(page, rowsPerPage, {});
  // }, [page, rowsPerPage]);

  return (
    <div className="p-3">
      <div className="px-2 d-flex gap-3 justify-content-end">
        <HeaderWithBackButton
          className="Layout-heading"
          title="Feedbacks"
          path="/dashboard"
        />
        <FeedbackCard
          icon="mdi:account-pending"
          title="Total pending feedbacks"
          count={pendingFeedbacks || 0}
        />
        <FeedbackCard
          icon="quill:send-later"
          title="Feedback not send yet"
          count={feedbackRemaining?.length || 0}
        />
      </div>
      <div className="row mt-2 mb-0 border-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
          <div className="mb-4 mt-2 ms-2">
            <ReactFilterChips
              filterData={filterState}
              tempState={filterStateTem}
              emptyFilter={EMPTY_FILTER}
              clearLabel="Clear All"
              filterLabel="Filtered By:"
              onDeleteChip={onDeleteChip}
              onClear={onClear}
              customIcon={<CloseRoundedIcon className="Filter_Chip_ICon" />}
            />
          </div>
          <div>
            <Button
              variant="contained"
              size="medium"
              onClick={(e) => handleOpenDrawer(e)}
              className="Data-Adding-Btn"
              endIcon={<FilterAltRoundedIcon />}
            >
              Filter
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={handleAddingMember}
              className="Data-Adding-Btn ms-2"
              endIcon={<AddCircleOutlineOutlinedIcon />}
            >
              New Feedback
            </Button>
            {status.permissions && <LongMenu status={status} />}
          </div>
        </div>
        <div className="Exhibitors_table px-4">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center circular_progress_bar ">
              <CircularProgress />
            </div>
          ) : (
            <div className=" shadow-lg">
              <ReactTable
                data={feedbackList}
                TABLE_HEAD={TABLE_HEAD}
                MENU_OPTIONS={MENU_OPTIONS} // Pass dynamic menu options per row
                custom_pagination={{
                  total_count: totalCount,
                  rows_per_page: rowsPerPage,
                  page: page,
                  total_pages: totalPages,
                  handleChangePage: handleChangePage,
                  handleRowsPerPageChange: handleRowsPerPageChange,
                }}
                custom_search={{
                  searchText: searchText,
                  setSearchText: setSearchText,
                  handleSubmit: searchFunction,
                }}
                theme_config={{
                  background: "white",
                  color: "black",
                  iconColor: "#006599",
                }}
                is_sticky_header={false}
                is_hide_footer_pagination={false}
                is_hide_header_pagination={false}
                is_hide_search={false}
              />
            </div>
          )}
        </div>

        <DetailsModal
          open={showDetails}
          handleClose={hideExhibitorDetailsModal}
          component={
            <ExhibitorDetailsModal
              handleOpen={showExhibitorDetailsModal}
              handleClose={hideExhibitorDetailsModal}
              selectedObject={selectedObject}
            />
          }
        />
        <DeletingModal
          className="Deleting-modal"
          open={modelOpen}
          handleClose={() => setModelOpen(false)}
          component={
            <DeletionConfirmation
              onConfirm={(e) => onConfirm(e)}
              onCancel={onCancel}
            />
          }
        />
        <CustomDrawer
          title={"Filter Feedbacks"}
          isOpen={isOpen}
          setIsOpen={closeDrawer}
          component={
            <FeedbackFilter
              selectedDate={selectedDate}
              value={value}
              filterData={setSetFilterData}
              handleStatusChange={handleStatusChange}
              searchFunction={searchFunction}
              RemoveFilterData={RemoveFilterData}
              handleCompanyNameChange={handleCompanyNameChange}
            />
          }
        />
      </div>
    </div>
  );
};

export default FeedBacks;
