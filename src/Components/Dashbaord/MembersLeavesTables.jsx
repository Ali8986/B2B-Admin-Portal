import { Chip } from "@mui/material";
import ReactDataTable from "../GeneralComponents/React_Table";
import moment from "moment";
const TABLE_HEAD_leaves_List = [
  {
    id: "any",
    label: "#",
    renderData: (row, index) => index + 1,
  },
  {
    id: "name",
    label: "Member Name",
    type: "name",
  },
  {
    id: "any",
    label: "Leave Date",
    renderData: (row) => {
      return <span>{moment(row.leave_date).format("MM-DD-YYYY")}</span>;
    },
  },
  {
    id: "leave_type",
    label: "Leave Type",
    renderData: (row) => {
      return (
        <span>
          <Chip
            label={
              row.leave_type === "full"
                ? "Full"
                : row.leave_type === "half"
                ? "Half"
                : ""
            }
            color={
              row.leave_type === "full"
                ? "secondary"
                : row.leave_type === "half"
                ? "secondary"
                : ""
            }
          />
        </span>
      );
    },
  },
  {
    id: "status",
    label: "Status",
    renderData: (row) => {
      return (
        <span>
          <Chip
            className={`${row.status === "pending" && "text-white"}`}
            label={
              row.status === "pending"
                ? "Pending"
                : row.status === "approved"
                ? "Approved"
                : row.status === "rejected"
                ? "Rejected"
                : ""
            }
            color={
              row.status === "pending"
                ? "warning"
                : row.status === "approved"
                ? "success"
                : row.status === "rejected"
                ? "error"
                : ""
            }
          />
        </span>
      );
    },
  },
];

const MENU_OPTIONS = [];
const MembersLeavesTable = ({ OnLeaveMembersList }) => {
  return (
    <ReactDataTable
      data={OnLeaveMembersList}
      header={TABLE_HEAD_leaves_List}
      Menu={MENU_OPTIONS}
      pagination={{}}
      search={{}}
      CustomStyling="Data_Table"
      is_sticky_header={false}
      is_hide_footer_pagination={true}
      is_hide_header_pagination={true}
      is_hide_search={true}
    />
  );
};

export default MembersLeavesTable;
