import React from "react";
import moment from "moment";
import { Chip } from "@mui/material";
import ReactDataTable from "../GeneralComponents/React_Table";
const TABLE_HEAD_Tickets_List = [
  {
    id: "any",
    label: "#",
    renderData: (row, index) => index + 1,
  },
  {
    id: "emp_name",
    label: "Member Name",
    type: "emp_name",
  },
  {
    id: "title",
    label: "Subject",
    type: "title",
  },
  {
    id: "any",
    label: "Ticket Date",
    renderData: (row, index) => {
      return (
        <span key={index}>{moment(row.createdAt).format("DD-MM-YYYY")}</span>
      );
    },
  },
  {
    id: "status",
    label: "status",
    renderData: (row) => {
      return (
        <span>
          <Chip
            label={
              row.status === 0
                ? "Open"
                : row.status === 1
                ? "Closed"
                : row.status === 2
                ? "Pending"
                : ""
            }
            color={
              row.status === 0
                ? "secondary"
                : row.status === 1
                ? "success"
                : row.status === 2
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

const SupportTicketTable = ({ SupportTicketsList }) => {
  return (
    <ReactDataTable
      data={SupportTicketsList}
      header={TABLE_HEAD_Tickets_List}
      Menu={MENU_OPTIONS}
      pagination={{}}
      search={{}}
      is_sticky_header={false}
      is_hide_footer_pagination={true}
      is_hide_header_pagination={true}
      is_hide_search={true}
    />
  );
};

export default SupportTicketTable;
